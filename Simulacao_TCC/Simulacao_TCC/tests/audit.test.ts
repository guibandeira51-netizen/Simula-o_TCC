import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { ALL, GalacticPotential } from "../src/physics/potentials";
import { NUMERICS, SOLAR, VELOCITY } from "../src/data/parameters";
import {
  chooseComparisonStep,
  initialConditions,
  isCircularPlanarInitial,
} from "../src/physics/initialConditions";
import { copyState, leapfrog } from "../src/physics/integrator";
import { Monitor, invariants } from "../src/physics/diagnostics";
import { speedKmS } from "../src/physics/kinematics";
import { TrajectoryRecorder } from "../src/simulation/trajectory";
import { VectorField } from "../src/entities/VectorField";
import {
  formatChartValue,
  LegendVisibility,
} from "../src/ui/chartPresentation";
import { ChartsManager } from "../src/ui/ChartsManager";

const full = new GalacticPotential(),
  bary = new GalacticPotential({ ...ALL, halo: false });

test("Preset solar → circular changes the initial speed; circular velocity changes direction", () => {
  const solar = initialConditions(full, "solar"),
    circular = initialConditions(full, "circular");
  assert.ok(speedKmS(solar.v) - speedKmS(circular.v) > SOLAR.V);
  assert.ok(
    Math.abs(speedKmS(circular.v) - full.circularSpeed(SOLAR.R)) < 1e-12,
  );
  const period =
    (2 * Math.PI * SOLAR.R) / (full.circularSpeed(SOLAR.R) * VELOCITY);
  const N = Math.ceil(
    period / 4 / chooseComparisonStep([full, bary], circular),
  );
  const h = period / 4 / N,
    v0 = speedKmS(circular.v);
  for (let i = 0; i < N; i++) leapfrog(circular, h, full);
  assert.ok(Math.abs(speedKmS(circular.v) / v0 - 1) < 3e-6);
  assert.ok(circular.v[0] < 0 && Math.abs(circular.v[1]) < 0.002);
});

test("One-percent radial perturbation changes the speed norm only in second order", () => {
  const circular = initialConditions(full, "circular"),
    perturbed = initialConditions(full, "perturbed");
  const expectedRatio = Math.sqrt(1 + NUMERICS.perturbationFraction ** 2);
  assert.ok(
    Math.abs(speedKmS(perturbed.v) / speedKmS(circular.v) - expectedRatio) <
      1e-14,
  );
});

test("Circular in reference is not circular after removing the halo", () => {
  const s = initialConditions(full, "circular");
  assert.equal(isCircularPlanarInitial(s, full), true);
  assert.equal(isCircularPlanarInitial(s, bary), false);
  assert.equal(
    isCircularPlanarInitial(initialConditions(full, "solar"), full),
    false,
  );
  assert.equal(
    isCircularPlanarInitial(initialConditions(full, "perturbed"), full),
    false,
  );
});

test("Fixed common step resolves actual initial velocity in all seven field selections", () => {
  // Radii are mathematical test locations, not additional astronomical inputs.
  for (let mask = 1; mask < 8; mask++)
    for (const R of [0.5, 1, 2, 5, SOLAR.R, 15, 30, 50]) {
      const f = new GalacticPotential({
        halo: !!(mask & 1),
        disk: !!(mask & 2),
        bulge: !!(mask & 4),
      });
      const b = new GalacticPotential({ ...f.components, halo: false }),
        s = initialConditions(full, "circular", R);
      const h = chooseComparisonStep([f, b], s);
      for (const field of [f, b]) {
        const d = new Monitor(s, field).measure(s, field, h);
        assert.equal(
          d.warning,
          false,
          `mask=${mask}, R=${R}, hω=${d.resolution}`,
        );
        assert.ok(
          d.resolution <=
            ((2 * Math.PI) / NUMERICS.samplesPerFastPeriod) * (1 + 1e-12),
        );
      }
      assert.equal(chooseComparisonStep([f, b], s, 2), h / 2);
      assert.equal(chooseComparisonStep([f, b], s, 4), h / 4);
    }
});

test("Energy near escape is ill-conditioned, not a spurious integration failure", () => {
  // Bisection locates a mathematical E0=0 of this model; it is not a fitted physical radius.
  let low = 12,
    high = 13;
  for (let i = 0; i < 50; i++) {
    const R = (low + high) / 2;
    if (invariants(initialConditions(full, "circular", R), bary).E < 0) low = R;
    else high = R;
  }
  for (const R of [12.22, 12.221, (low + high) / 2]) {
    const s = initialConditions(full, "circular", R),
      m = new Monitor(s, bary),
      h = chooseComparisonStep([full, bary], s);
    for (let i = 0; i < 200; i++) {
      leapfrog(s, h, bary);
      const d = m.measure(s, bary, h);
      assert.equal(
        d.warning,
        false,
        `R=${R}; robust=${d.energyError}; relative=${d.relativeEnergy}`,
      );
    }
    s.v[1] *= 1.05;
    assert.equal(
      m.measure(s, bary, h).warning,
      true,
      "Real injected energy error must still be detected",
    );
  }
});

test("Analytical circular orbit does not acquire a physical radial period from truncation", () => {
  const s = initialConditions(full, "circular"),
    h = chooseComparisonStep([full, bary], s);
  const recorder = new TrajectoryRecorder(isCircularPlanarInitial(s, full));
  recorder.record(s, false);
  for (let i = 0; i < Math.ceil(1 / h); i++) {
    leapfrog(s, h, full);
    recorder.record(s, false);
  }
  const summary = recorder.summary();
  assert.equal(summary.radialMotion, "circular-planar");
  assert.equal(summary.radialPeriod, null);
  assert.equal(summary.pericenter, null);
  assert.equal(summary.apocenter, null);
  assert.ok(
    summary.rMax > summary.rMin,
    "Observed numerical excursion remains available",
  );
  assert.ok(summary.azimuthalPeriod !== null && summary.azimuthalPeriod > 0);
  assert.equal(recorder.points.length, 0, "No redundant per-step buffer");
});

test("Perturbed orbit retains its measured radial oscillation", () => {
  const s = initialConditions(full, "perturbed"),
    h = chooseComparisonStep([full, bary], s);
  const recorder = new TrajectoryRecorder(isCircularPlanarInitial(s, full));
  recorder.record(s, false);
  for (let i = 0; i < Math.ceil(1 / h); i++) {
    leapfrog(s, h, full);
    recorder.record(s, false);
  }
  const measured = recorder.summary().radialPeriod,
    expected = (2 * Math.PI) / Math.sqrt(full.frequencies(SOLAR.R).kappa2);
  assert.ok(measured !== null && Math.abs(measured / expected - 1) < 0.01);
});

test("Azimuthal period is detected after one completed turn, including retrograde motion", () => {
  const prograde = initialConditions(full, "circular");
  for (const sign of [1, -1]) {
    const s = copyState(prograde);
    s.v[1] *= sign;
    const h = chooseComparisonStep([full], s),
      recorder = new TrajectoryRecorder(true);
    const T =
      (2 * Math.PI * SOLAR.R) / (full.circularSpeed(SOLAR.R) * VELOCITY);
    recorder.record(s, false);
    for (let i = 0; i < Math.ceil((1.1 * T) / h); i++) {
      leapfrog(s, h, full);
      recorder.record(s, false);
    }
    const measured = recorder.summary().azimuthalPeriod;
    assert.ok(measured !== null && Math.abs(measured / T - 1) < 1e-5);
  }
});

test("Every arrow child belongs only to its scenario camera", () => {
  const scene = new THREE.Scene(),
    cameras = [new THREE.PerspectiveCamera(), new THREE.PerspectiveCamera()];
  cameras[0].layers.enable(1);
  cameras[1].layers.enable(2);
  for (const layer of [1, 2]) {
    const field = new VectorField(scene, layer);
    field.group.traverse((object) => {
      if (object instanceof THREE.Line || object instanceof THREE.Mesh) {
        assert.equal(object.layers.mask, 1 << layer);
        assert.equal(object.layers.test(cameras[layer - 1].layers), true);
        assert.equal(object.layers.test(cameras[2 - layer].layers), false);
      }
    });
  }
});

test("Legend choices survive new datasets and changing tracer labels", () => {
  const visibility = new LegendVisibility();
  visibility.toggle("Disco", true);
  assert.equal(visibility.apply([{ label: "Disco" }])[0].hidden, true);
  visibility.toggle("current-circular-speed", true);
  assert.equal(
    visibility.apply([
      { label: "vc=200", seriesKey: "current-circular-speed" },
    ])[0].hidden,
    true,
  );
  assert.equal(
    visibility.apply([
      { label: "vc=210", seriesKey: "current-circular-speed" },
    ])[0].hidden,
    true,
  );
  visibility.toggle("Disco", false);
  assert.equal(visibility.apply([{ label: "Disco" }])[0].hidden, false);
  assert.equal(
    visibility.apply([{ label: "Halo", hidden: true }])[0].hidden,
    true,
  );
});

test("Rotation → energy → errors rebinds tooltip units in the actual chart manager", () => {
  const oldDocument = globalThis.document;
  const note = { textContent: "" };
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: { getElementById: () => note },
  });
  try {
    const manager = Object.create(ChartsManager.prototype) as ChartsManager;
    const chart = {
      data: { datasets: [] },
      options: {
        scales: { x: {}, y: {} },
        plugins: { tooltip: { callbacks: {} } },
      },
      update: () => {},
    };
    Object.assign(manager, {
      chart,
      field: full,
      currentRadius: SOLAR.R,
      samples: [],
      rotationCache: [],
      rotationCacheKey: "",
      mainLegend: new LegendVisibility(),
    });
    const label = () =>
      (chart.options.plugins.tooltip.callbacks as any).label({
        dataset: { label: "test" },
        parsed: { y: 2 },
      });
    manager.mode = "rotation";
    manager.render();
    assert.match(label(), /km\/s$/);
    manager.mode = "energy";
    manager.render();
    assert.match(label(), /\(km\/s\)²$/);
    manager.mode = "errors";
    manager.render();
    assert.match(label(), /adimensional$/);
  } finally {
    if (oldDocument === undefined)
      Reflect.deleteProperty(globalThis, "document");
    else
      Object.defineProperty(globalThis, "document", {
        configurable: true,
        value: oldDocument,
      });
  }
  assert.match(formatChartValue("D", NaN, "discrepancy"), /indefinido$/);
  assert.match(formatChartValue("Δr", 2, "separation"), /kpc$/);
});
