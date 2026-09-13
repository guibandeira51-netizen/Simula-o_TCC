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
for (const component of ["halo", "disk", "bulge", "nucleus"] as const) {
  test(`${component}: força = −gradiente do potencial em pontos 3D`, () => {
    const p = new GalacticPotential({
      halo: false,
      disk: false,
      bulge: false,
      nucleus: false,
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
    const n = (G * MODEL.nucleus.mass * R) / (R + MODEL.nucleus.a) ** 2;
    near(p.circularSpeed(R), Math.sqrt(h + d + b + n), 1e-9);
  }
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
