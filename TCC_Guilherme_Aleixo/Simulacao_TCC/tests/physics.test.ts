import test from "node:test";
import assert from "node:assert/strict";
import {
  GalacticPotential,
  ALL,
  nfwF,
  haloPotential,
  type Vec3,
  type Field,
} from "../src/physics/potentials";
import {
  G,
  MODEL,
  SOLAR,
  VELOCITY,
  ACCELERATION,
  NUMERICS,
} from "../src/data/parameters";
import {
  initialConditions,
  chooseStep,
} from "../src/physics/initialConditions";
import { copyState, leapfrog, type State } from "../src/physics/integrator";
import { Monitor, invariants } from "../src/physics/diagnostics";
import { SimulationClock } from "../src/simulation/Clock";
import { rotationAt } from "../src/physics/circularVelocity";
import { cylindricalVelocity } from "../src/physics/kinematics";
import { TrajectoryRecorder } from "../src/simulation/trajectory";
import { createComparison, initialDiagnostics, orbitalBinding } from "../src/simulation/comparison";
const near = (a: number, b: number, tol: number) =>
  assert.ok(Math.abs(a - b) <= tol, `${a} versus ${b}; tolerance ${tol}`);

test("Unidades: km/s → kpc/Gyr e G astronômico", () => {
  near(VELOCITY, 1.022712165045695, 1e-14);
  near(G, 4.30091727e-6, 1e-14);
});
test("NFW: limite central, massa positiva e continuidade da série", () => {
  near(haloPotential(0), (-G * MODEL.halo.scaleMass) / MODEL.halo.rs, 1e-10);
  for (const u of [1e-12, 1e-10, 1e-8]) near(nfwF(u) / (u * u), 0.5, 1e-7);
  const b = NUMERICS.nfwSeriesBoundary;
  near(nfwF(b * (1 - 1e-9)) / nfwF(b * (1 + 1e-9)), 1, 1e-8);
  assert.throws(() => new GalacticPotential().acceleration([0, 0, 0]));
});
for (const component of ["halo", "disk", "bulge"] as const) {
  test(`${component}: força = −gradiente do potencial em pontos 3D`, () => {
    const p = new GalacticPotential({
      halo: false,
      disk: false,
      bulge: false,
      [component]: true,
    });
    for (const q of [
      [0.5, 0.4, 0.03],
      [8.178, -2, 0.6],
      [30, 12, -3],
    ] as Vec3[]) {
      const a = p.acceleration(q),
        h = 1e-4;
      for (let i = 0; i < 3; i++) {
        const plus = [...q] as Vec3,
          minus = [...q] as Vec3;
        plus[i] += h;
        minus[i] -= h;
        const expected =
          (-(p.potential(plus) - p.potential(minus)) / (2 * h)) * ACCELERATION;
        near(a[i], expected, Math.max(1, Math.abs(expected)) * 2e-6);
      }
    }
  });
}
test("Curva circular: fórmulas independentes e soma quadrática", () => {
  const p = new GalacticPotential();
  for (const R of [0.5, 1, 2, 5, 8.178, 15, 30, 50]) {
    const u = R / MODEL.halo.rs;
    const h = (G * MODEL.halo.scaleMass * (Math.log(1 + u) - u / (1 + u))) / R;
    const d =
      (G * MODEL.disk.mass * R * R) /
      (R * R + (MODEL.disk.a + MODEL.disk.b) ** 2) ** 1.5;
    const b = (G * MODEL.bulge.mass * R) / (R + MODEL.bulge.a) ** 2;
    near(p.circularSpeed(R), Math.sqrt(h + d + b), 1e-9);
  }
});
test("Curva circular: v_c² = −R a_R no plano z=0", () => {
  const p = new GalacticPotential();
  for (const R of [0.5, 2, SOLAR.R, 20, 50]) {
    const acceleration = p.acceleration([R, 0, 0]);
    near(p.circularSpeed(R) ** 2, (-R * acceleration[0]) / ACCELERATION, 1e-10);
  }
});
test("Componentes de aceleração somam exatamente o vetor total", () => {
  const p = new GalacticPotential();
  for (const q of [[0.7, -0.4, 0.2], [8.178, 1.1, -0.3], [30, -5, 4]] as Vec3[]) {
    const c = p.accelerationComponents(q);
    const sum = (i: number) => c.disk[i] + c.bulge[i] + c.halo[i];
    for (let i = 0; i < 3; i++) near(c.total[i], sum(i), 8 * Number.EPSILON * Math.max(1, Math.abs(sum(i))));
    near(Math.hypot(...p.acceleration(q)), Math.hypot(...c.total), 1e-12);
  }
  const baryonic = new GalacticPotential({ ...ALL, halo: false });
  const c = baryonic.accelerationComponents([8.178, 0, 0]);
  near(Math.hypot(...c.halo), 0, 0);
  for (let i = 0; i < 3; i++)
    near(c.total[i], c.disk[i] + c.bulge[i], 1e-12);
});
test("Rotação: v² total, frações e massa dinâmica equivalente", () => {
  const p = new GalacticPotential(), r = rotationAt(p, SOLAR.R);
  near(r.total ** 2, r.baryonic ** 2 + r.halo ** 2, 1e-10);
  near(r.fBar + r.fHalo, 1, 1e-12);
  near(r.dynamicMassEquivalent, SOLAR.R * r.total ** 2 / G, 1e-8);
  const disabled = rotationAt(new GalacticPotential({ ...ALL, halo: false }), SOLAR.R);
  near(disabled.discrepancy, 1, 1e-12);
  near(disabled.fHalo, 0, 1e-12);
});
test("Cinemática cilíndrica trata R=0 sem divisão por zero", () => {
  const k = cylindricalVelocity([0, 0, 1], [2, 3, 4]);
  near(k.R, 0, 0);
  near(k.vR, 0, 0);
  near(k.vPhi, 0, 0);
});
test("Resumo de trajetória mede extremos e velocidade média", () => {
  const recorder = new TrajectoryRecorder();
  const states: State[] = [
    { q: [1, 0, 0], v: [0, 1, 0], t: 0 },
    { q: [2, 0, 0], v: [0, 1, 0], t: 1 },
    { q: [1, 0, 0], v: [0, 1, 0], t: 2 },
  ];
  states.forEach((s) => recorder.record(s));
  const summary = recorder.summary();
  near(summary.rMin, 1, 0);
  near(summary.rMax, 2, 0);
  near(summary.eccentricity, 1 / 3, 1e-12);
  assert.ok(summary.meanSpeed > 0);
});
test("Condições solares: sinais e componentes; circular planar sem perturbação", () => {
  const p = new GalacticPotential(),
    s = initialConditions(p, "solar"),
    c = initialConditions(p, "circular");
  near(s.v[0] / VELOCITY, -SOLAR.U, 1e-12);
  near(s.v[1] / VELOCITY, p.circularSpeed(SOLAR.R) + SOLAR.V, 1e-12);
  near(s.v[2] / VELOCITY, SOLAR.W, 1e-12);
  assert.deepEqual(c.q, [SOLAR.R, 0, 0]);
  assert.equal(c.v[0], 0);
  assert.equal(c.v[2], 0);
  assert.throws(() => initialConditions(p, "circular", 0.1));
});
for (const R of [0.5, 1, 2, 5, 8.178, 15, 30, 50]) {
  test(`Órbita circular R=${R} kpc: 10 períodos, energia, Lz e raio`, () => {
    const p = new GalacticPotential(),
      s = initialConditions(p, "circular", R),
      h = chooseStep(p, R);
    const m = new Monitor(s, p),
      T = (2 * Math.PI * R) / (p.circularSpeed(R) * VELOCITY);
    let radial = 0;
    for (let i = 0; i < Math.ceil((10 * T) / h); i++) {
      leapfrog(s, h, p);
      radial = Math.max(radial, Math.abs(Math.hypot(s.q[0], s.q[1]) - R) / R);
      if (i % 16 === 0) m.measure(s, p, h);
    }
    assert.ok(radial < 3e-5, `radial=${radial}`);
    assert.ok(m.maxEnergy < 1e-7, `E=${m.maxEnergy}`);
    assert.ok(m.maxAngular < 1e-10);
  });
}
test("Traçador solar e comparação sem halo: 5 Gyr, E e Lz", () => {
  const full = new GalacticPotential(),
    initial = initialConditions(full, "solar"),
    h = chooseStep(full, SOLAR.R);
  for (const p of [full, new GalacticPotential({ ...ALL, halo: false })]) {
    const s = copyState(initial),
      m = new Monitor(s, p);
    for (let i = 0; i < Math.ceil(5 / h); i++) {
      leapfrog(s, h, p);
      if (i % 16 === 0) m.measure(s, p, h);
    }
    assert.ok(m.maxEnergy < NUMERICS.energyTolerance, `E=${m.maxEnergy}`);
    assert.ok(m.maxAngular < 1e-10);
  }
});
test("Perturbação radial pequena reproduz período epicíclico linear", () => {
  const p = new GalacticPotential(),
    R = SOLAR.R,
    s = initialConditions(p, "perturbed"),
    h = chooseStep(p, R);
  const expected = (2 * Math.PI) / Math.sqrt(p.frequencies(R).kappa2),
    crossings: number[] = [];
  let prev = 0;
  for (let i = 0; i < Math.ceil((5 * expected) / h); i++) {
    leapfrog(s, h, p);
    const dr = Math.hypot(s.q[0], s.q[1]) - R;
    if (prev < 0 && dr >= 0) crossings.push(s.t);
    prev = dr;
  }
  assert.ok(crossings.length >= 3);
  near((crossings[2] - crossings[0]) / 2 / expected, 1, 0.01);
});
test("Convergência de trajetória de segunda ordem e reversibilidade", () => {
  const p = new GalacticPotential(),
    initial = initialConditions(p, "solar"),
    T = 0.2;
  const endpoints = [500, 1000, 2000].map((N) => {
    const s = copyState(initial);
    for (let i = 0; i < N; i++) leapfrog(s, T / N, p);
    return s;
  });
  const d = (a: State, b: State) =>
    Math.hypot(...a.q.map((v, i) => v - b.q[i]));
  const ratio = d(endpoints[0], endpoints[1]) / d(endpoints[1], endpoints[2]);
  assert.ok(ratio > 3.7 && ratio < 4.3, `ratio=${ratio}`);
  const s = copyState(initial),
    h = chooseStep(p, SOLAR.R);
  for (let i = 0; i < 10000; i++) leapfrog(s, h, p);
  for (let i = 0; i < 10000; i++) leapfrog(s, -h, p);
  near(d(s, initial), 0, 1e-8);
});
test("Kepler: órbita elíptica analítica, período e vetor L", () => {
  // Dimensionless mathematical benchmark: mu=1, semimajor axis=1, e=0.4; not Galaxy inputs.
  const field: Field = {
    potential: (q) => -1 / Math.hypot(...q) / ACCELERATION,
    acceleration: (q) => q.map((v) => -v / Math.hypot(...q) ** 3) as Vec3,
  };
  const e = 0.4,
    s: State = {
      q: [1 - e, 0, 0],
      v: [0, Math.sqrt((1 + e) / (1 - e)), 0],
      t: 0,
    },
    N = 20000,
    h = (2 * Math.PI) / N;
  let maxPositionError = 0;
  for (let i = 0; i < N; i++) {
    leapfrog(s, h, field);
    let E = s.t;
    for (let j = 0; j < 12; j++)
      E -= (E - e * Math.sin(E) - s.t) / (1 - e * Math.cos(E));
    maxPositionError = Math.max(
      maxPositionError,
      Math.hypot(
        s.q[0] - (Math.cos(E) - e),
        s.q[1] - Math.sqrt(1 - e * e) * Math.sin(E),
      ),
    );
  }
  assert.ok(maxPositionError < 1e-5, `${maxPositionError}`);
  near(s.q[0], 1 - e, 1e-5);
  near(s.q[1], 0, 1e-5);
});
test("Potencial esférico conserva todas as componentes de L", () => {
  const p = new GalacticPotential({ ...ALL, disk: false }),
    s = initialConditions(p, "solar");
  const cross = (s: State) => [
    s.q[1] * s.v[2] - s.q[2] * s.v[1],
    s.q[2] * s.v[0] - s.q[0] * s.v[2],
    s.q[0] * s.v[1] - s.q[1] * s.v[0],
  ];
  const L = cross(s),
    h = chooseStep(p, SOLAR.R);
  for (let i = 0; i < 10000; i++) leapfrog(s, h, p);
  cross(s).forEach((v, i) => near(v, L[i], 1e-8));
});
test("Monitor detecta passo inadequado e erro de energia injetado", () => {
  const p = new GalacticPotential(),
    s = initialConditions(p, "solar"),
    m = new Monitor(s, p),
    h = chooseStep(p, SOLAR.R);
  assert.equal(m.measure(s, p, h).warning, false);
  assert.equal(m.measure(s, p, h * 100).warning, true);
  s.v[1] *= 1.05;
  assert.equal(m.measure(s, p, h).warning, true);
});
test("Órbita no limite externo não gera falso alarme por oscilação truncada", () => {
  const p = new GalacticPotential(),
    s = initialConditions(p, "circular", 50),
    h = chooseStep(p, 50),
    m = new Monitor(s, p);
  for (let i = 0; i < 4000; i++) {
    leapfrog(s, h, p);
    assert.equal(m.measure(s, p, h).warning, false);
  }
});
test("Campo sem halo admite sua própria órbita circular estável", () => {
  const p = new GalacticPotential({ ...ALL, halo: false }),
    s = initialConditions(p, "circular"),
    h = chooseStep(p, SOLAR.R),
    m = new Monitor(s, p);
  let radial = 0;
  for (let i = 0; i < 20000; i++) {
    leapfrog(s, h, p);
    radial = Math.max(
      radial,
      Math.abs(Math.hypot(s.q[0], s.q[1]) - SOLAR.R) / SOLAR.R,
    );
    m.measure(s, p, h);
  }
  assert.ok(radial < 3e-5);
  assert.ok(m.maxEnergy < 1e-7);
});
test("Relógio independe de FPS; orçamento preserva dívida temporal", () => {
  const counts = [30, 60, 144].map((fps) => {
    const c = new SimulationClock();
    let n = 0;
    for (let i = 0; i < fps * 10; i++)
      c.advance(1 / fps, 0.02, 0.0001, () => {
        n++;
        return true;
      });
    return n;
  });
  assert.ok(Math.max(...counts) - Math.min(...counts) <= 1);
  const c = new SimulationClock();
  c.advance(10, 1, 0.0001, () => true);
  assert.ok(c.debt > 9);
});

test("Modelo tem exatamente três componentes e parâmetros preservados", () => {
  assert.deepEqual(Object.keys(ALL).sort(), ["bulge", "disk", "halo"]);
  assert.deepEqual(MODEL.bulge, { mass: 5e9, a: 1 });
  assert.deepEqual(MODEL.disk, { mass: 6.8e10, a: 3, b: 0.28 });
  assert.deepEqual(MODEL.halo, { scaleMass: 5.4e11, rs: 15.62 });
});

test("Todas as oito seleções: potencial, aceleração e vc² aditivos", () => {
  const q: Vec3 = [8.178, 2, -0.3];
  for (let mask = 0; mask < 8; mask++) {
    const flags = { halo: !!(mask & 1), disk: !!(mask & 2), bulge: !!(mask & 4) };
    const field = new GalacticPotential(flags);
    let phi = 0, vc2 = 0;
    const a = [0, 0, 0];
    for (const key of ["halo", "disk", "bulge"] as const) {
      if (!flags[key]) continue;
      const isolated = new GalacticPotential({ halo: false, disk: false, bulge: false, [key]: true });
      phi += isolated.potential(q);
      vc2 += isolated.circularSpeed(SOLAR.R) ** 2;
      isolated.acceleration(q).forEach((v, i) => a[i] += v);
    }
    near(field.potential(q), phi, 1e-9);
    near(field.circularSpeed(SOLAR.R) ** 2, vc2, 1e-9);
    field.acceleration(q).forEach((v, i) => near(v, a[i], 1e-10));
  }
});

test("Comparação copia r0 e v0 e retira somente o halo", () => {
  const full = new GalacticPotential(), initial = initialConditions(full, "solar");
  const { primary, comparison } = createComparison(ALL, initial);
  assert.deepEqual(primary.state, comparison.state);
  assert.notEqual(primary.state.q, comparison.state.q);
  assert.notEqual(primary.state.v, comparison.state.v);
  const halo = new GalacticPotential({ halo: true, disk: false, bulge: false });
  near(primary.field.potential(initial.q) - comparison.field.potential(initial.q), halo.potential(initial.q), 1e-9);
  const a = primary.field.acceleration(initial.q), b = comparison.field.acceleration(initial.q);
  halo.acceleration(initial.q).forEach((v,i) => near(a[i]-b[i],v,1e-10));
  near(invariants(initial,primary.field).E - invariants(initial,comparison.field).E, halo.potential(initial.q), 1e-9);
  const off = createComparison({ ...ALL, halo: false }, initial);
  off.primary.step(0.00001); off.comparison.step(0.00001);
  assert.deepEqual(off.primary.state, off.comparison.state);
});

test("Energia cilíndrica, Lz, classificação e referências nulas", () => {
  const field = new GalacticPotential(), s = initialConditions(field, "solar");
  const d = initialDiagnostics(s,field);
  near(d.E, (d.vR ** 2 + d.vPhi ** 2 + d.vz ** 2) / 2 + field.potential(s.q), 1e-10);
  near(d.Lz, d.R * d.vPhi, 1e-10);
  assert.equal(orbitalBinding(-1), "Órbita ligada");
  assert.equal(orbitalBinding(0), "Órbita não ligada");
  assert.equal(orbitalBinding(1), "Órbita não ligada");
  const zero = new GalacticPotential({ halo: false, disk: false, bulge: false });
  const stationary: State = { q: [1,0,0], v: [0,0,0], t: 0 };
  const diagnostic = new Monitor(stationary,zero).measure(stationary,zero,0.001);
  assert.equal(diagnostic.relativeEnergy,null);
  assert.equal(diagnostic.relativeAngular,null);
});

test("Extremo parcial não é apoastro e trajetória não ligada não recebe apoastro", () => {
  const recorder = new TrajectoryRecorder();
  recorder.record({ q:[1,0,0], v:[1,0,0], t:0 });
  recorder.record({ q:[2,0,0], v:[1,0,0], t:1 });
  assert.equal(recorder.summary().apocenter,null);
  recorder.record({ q:[2,0,0], v:[-1,0,0], t:2 });
  assert.equal(recorder.summary(true).apocenter,2);
  assert.equal(recorder.summary(false).apocenter,null);
  assert.equal(recorder.summary(false).radialPeriod,null);
});
