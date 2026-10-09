/** Reproducible October audit. Observations below never enter the dynamical field. */
import { mkdirSync, writeFileSync } from "node:fs";
import { ALL, GalacticPotential } from "../src/physics/potentials";
import {
  chooseComparisonStep,
  initialConditions,
  isCircularPlanarInitial,
} from "../src/physics/initialConditions";
import { copyState, leapfrog, type State } from "../src/physics/integrator";
import { invariants, Monitor } from "../src/physics/diagnostics";
import { cylindricalVelocity, speedKmS } from "../src/physics/kinematics";
import { internalVelocityToKmS } from "../src/physics/units";
import { rotationAt } from "../src/physics/circularVelocity";
import { initialDiagnostics } from "../src/simulation/comparison";
import { TrajectoryRecorder } from "../src/simulation/trajectory";
import { NUMERICS, SOLAR, VELOCITY } from "../src/data/parameters";

const full = new GalacticPotential(),
  bary = new GalacticPotential({ ...ALL, halo: false });
const initial = initialConditions(full, "solar");
const appStep = chooseComparisonStep([full, bary], initial);
// Numerical experiment duration and step counts, not astronomical input parameters.
const durationGyr = 5,
  baseSteps = Math.ceil(durationGyr / appStep);
function integrate(field: GalacticPotential, N: number) {
  const s = copyState(initial),
    monitor = new Monitor(s, field),
    h = durationGyr / N;
  const recorder = new TrajectoryRecorder(isCircularPlanarInitial(s, field));
  let maxResolution = 0,
    warnings = 0;
  recorder.record(s, false);
  for (let i = 0; i < N; i++) {
    leapfrog(s, h, field);
    const d = monitor.measure(s, field, h);
    maxResolution = Math.max(maxResolution, d.resolution);
    if (d.warning) warnings++;
    recorder.record(s, false);
  }
  return {
    N,
    hGyr: h,
    initial: initialDiagnostics(initial, field),
    final: s,
    durationGyr: s.t,
    maxRelativeEnergy: monitor.maxRelativeEnergy,
    maxRelativeLz: monitor.maxRelativeAngular,
    maxNormalizedEnergy: monitor.maxEnergy,
    maxNormalizedLz: monitor.maxAngular,
    maxResolution,
    warnings,
    trajectory: recorder.summary(monitor.baseline.E < 0),
  };
}
const positionDistance = (a: State, b: State) =>
  Math.hypot(...a.q.map((v, i) => v - b.q[i]));
const convergence = [full, bary].map((field) => {
  const runs = [1, 2, 4].map((refinement) =>
    integrate(field, baseSteps * refinement),
  );
  const coarseDifferenceKpc = positionDistance(runs[0].final, runs[1].final);
  const fineDifferenceKpc = positionDistance(runs[1].final, runs[2].final);
  return {
    components: field.components,
    runs,
    coarseDifferenceKpc,
    fineDifferenceKpc,
    secondOrderRatio: coarseDifferenceKpc / fineDifferenceKpc,
  };
});

const circularInitial = initialConditions(full, "circular");
const circular = copyState(circularInitial),
  ch = chooseComparisonStep([full, bary], circular);
const recorder = new TrajectoryRecorder(
  isCircularPlanarInitial(circular, full),
);
const circularMonitor = new Monitor(circular, full);
let minSpeed = speedKmS(circular.v),
  maxSpeed = minSpeed;
recorder.record(circular, false);
for (let i = 0; i < Math.ceil(1 / ch); i++) {
  leapfrog(circular, ch, full);
  recorder.record(circular, false);
  circularMonitor.measure(circular, full, ch);
  minSpeed = Math.min(minSpeed, speedKmS(circular.v));
  maxSpeed = Math.max(maxSpeed, speedKmS(circular.v));
}
const period =
  (2 * Math.PI * SOLAR.R) / (full.circularSpeed(SOLAR.R) * VELOCITY);
const quarter = copyState(circularInitial),
  quarterSteps = Math.ceil(period / 4 / ch);
for (let i = 0; i < quarterSteps; i++)
  leapfrog(quarter, period / 4 / quarterSteps, full);
const vectorKmS = (s: State) => s.v.map(internalVelocityToKmS);

// Escape-energy root is derived by bisection, not an additional physical parameter.
let low = 12,
  high = 13;
for (let i = 0; i < 50; i++) {
  const R = (low + high) / 2;
  if (invariants(initialConditions(full, "circular", R), bary).E < 0) low = R;
  else high = R;
}
const energyNearZero = [12.22, 12.221, (low + high) / 2].map((R) => {
  const s = initialConditions(full, "circular", R),
    monitor = new Monitor(s, bary);
  const h = chooseComparisonStep([full, bary], s);
  let warnings = 0;
  for (let i = 0; i < 200; i++) {
    leapfrog(s, h, bary);
    if (monitor.measure(s, bary, h).warning) warnings++;
  }
  return {
    R,
    E0: monitor.baseline.E,
    hGyr: h,
    maxRelativeEnergy: monitor.maxRelativeEnergy,
    maxNormalizedEnergy: monitor.maxEnergy,
    warnings,
    oldRelativeAlarmWouldTrigger:
      monitor.maxRelativeEnergy !== null &&
      monitor.maxRelativeEnergy > NUMERICS.energyTolerance,
  };
});
let maxInitialResolution = 0,
  initialWarnings = 0;
for (let mask = 1; mask < 8; mask++)
  for (const R of [0.5, 1, 2, 5, SOLAR.R, 15, 30, 50]) {
    const field = new GalacticPotential({
      halo: !!(mask & 1),
      disk: !!(mask & 2),
      bulge: !!(mask & 4),
    });
    const comparison = new GalacticPotential({
      ...field.components,
      halo: false,
    });
    const s = initialConditions(full, "circular", R),
      h = chooseComparisonStep([field, comparison], s);
    for (const f of [field, comparison]) {
      const d = new Monitor(s, f).measure(s, f, h);
      maxInitialResolution = Math.max(maxInitialResolution, d.resolution);
      if (d.warning) initialWarnings++;
    }
  }

// Literal rows from Ou et al. (2024), Table 1; asymmetric formal uncertainties.
// https://doi.org/10.1093/mnras/stae034 ; https://arxiv.org/html/2303.12838v2
// Not the full systematic error budget and never used to tune the physical parameters.
const ouRows = [
  [8.19, 232.83, 0.56, 0.55],
  [12.23, 226.9, 0.39, 0.41],
  [16.24, 218.3, 2.17, 1.88],
  [20.22, 202.97, 1.55, 2.25],
  [23.4, 192.49, 4.25, 4.8],
  [25.02, 191.48, 6.41, 9.61],
  [27.31, 172.98, 15.82, 17.07],
];
const observations = ouRows.map(
  ([radiusKpc, velocityKmS, uncertaintyPlusKmS, uncertaintyMinusKmS]) => {
    const modelKmS = full.circularSpeed(radiusKpc);
    return {
      radiusKpc,
      velocityKmS,
      uncertaintyPlusKmS,
      uncertaintyMinusKmS,
      source: "Ou et al. (2024), Table 1",
      doi: "10.1093/mnras/stae034",
      sourceUrl: "https://arxiv.org/html/2303.12838v2",
      modelKmS,
      modelMinusObservedKmS: modelKmS - velocityKmS,
      relativeDifference: (modelKmS - velocityKmS) / velocityKmS,
    };
  },
);

const report = {
  auditDate: "2026-10-08",
  units: {
    length: "kpc",
    time: "Gyr",
    velocity: "km/s",
    energy: "(km/s)^2",
    Lz: "kpc km/s",
  },
  appStepGyr: appStep,
  exactTimeConvergence: convergence,
  presets: ["solar", "circular", "perturbed"].map((preset) => {
    const s = initialConditions(
      full,
      preset as "solar" | "circular" | "perturbed",
    );
    return {
      preset,
      state: s,
      velocityKmS: vectorKmS(s),
      ...initialDiagnostics(s, full),
    };
  }),
  localRotation: rotationAt(full, SOLAR.R),
  circularOneGyr: {
    hGyr: ch,
    durationGyr: circular.t,
    minSpeedKmS: minSpeed,
    maxSpeedKmS: maxSpeed,
    maxRelativeSpeedRange: (maxSpeed - minSpeed) / full.circularSpeed(SOLAR.R),
    trajectory: recorder.summary(),
    maxRelativeEnergy: circularMonitor.maxRelativeEnergy,
    maxRelativeLz: circularMonitor.maxRelativeAngular,
  },
  circularQuarterTurn: {
    initialVelocityKmS: vectorKmS(circularInitial),
    finalVelocityKmS: vectorKmS(quarter),
    finalCylindricalVelocity: cylindricalVelocity(quarter.q, quarter.v),
  },
  energyNearZero,
  initialResolution: {
    fieldSelections: 7,
    radiiPerSelection: 8,
    scenariosPerSelection: 2,
    maxInitialResolution,
    initialWarnings,
  },
  observations,
};
mkdirSync("docs", { recursive: true });
writeFileSync(
  "docs/audit-results-2026-10-08.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
