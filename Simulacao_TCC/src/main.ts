import "./style.css";
import { createComparison, scenarioLabel, initialDiagnostics } from "./simulation/comparison";
import * as THREE from "three";
import { PhysicsEngine } from "./physics/Engine";
import { GalacticPotential, type Components } from "./physics/potentials";
import {
  initialConditions,
  chooseStep,
  type Preset,
} from "./physics/initialConditions";
import { copyState } from "./physics/integrator";
import {
  MODEL,
  PHYSICAL_PARAMETERS,
  NUMERICS,
  SOLAR,
  PARAMETER_ROWS,
  REFERENCES,
} from "./data/parameters";
import { rotationAt } from "./physics/circularVelocity";
import { cylindricalVelocity, speedKmS } from "./physics/kinematics";
import { GraphicsCore } from "./graphics/Renderer";
import { Galaxy } from "./entities/Galaxy";
import { SunEntity } from "./entities/Sun";
import { OrbitTrail } from "./entities/OrbitTrail";
import { DeepSpace } from "./entities/DeepSpace";
import { ChartsManager, type Sample } from "./ui/ChartsManager";
import { populateSources, downloadJSON } from "./ui/UIManager";
import { SimulationClock } from "./simulation/Clock";
import { TrajectoryRecorder, spatialSeparation } from "./simulation/trajectory";
import { VectorField } from "./entities/VectorField";
import {
  internalAccelerationToKmS2PerKpc,
  vectorInternalAccelerationToKmS2PerKpc,
  vectorInternalVelocityToKmS,
} from "./physics/units";
const el = (id: string) => document.getElementById(id)!;
const input = (id: string) => el(id) as HTMLInputElement;
populateSources();

function start() {
  const gfx = new GraphicsCore();
  new DeepSpace(gfx.scene);
  const galaxy = new Galaxy(gfx.scene);
  const marker = new SunEntity(gfx.scene, 0xf5c47b, 1),
    comparisonMarker = new SunEntity(gfx.scene, 0xee91a8, 2);
  const vectors = new VectorField(gfx.scene, 1),
    comparisonVectors = new VectorField(gfx.scene, 2);
  const trail = new OrbitTrail(gfx.scene, 0xf5c47b, 1),
    comparisonTrail = new OrbitTrail(gfx.scene, 0xee91a8, 2);
  const charts = new ChartsManager(),
    clock = new SimulationClock();
  let primary: PhysicsEngine,
    comparison: PhysicsEngine,
    primaryTrajectory = new TrajectoryRecorder(),
    comparisonTrajectory = new TrajectoryRecorder(),
    h = 0,
    steps = 0,
    paused = false,
    fault = false,
    follow = false,
    faultMessage = "";
  let initial = initialConditions(new GalacticPotential(), "solar");
  let preset: Preset = "solar",
    lastFrame = performance.now(),
    lastUi = 0,
    lastChart = 0,
    lastFps = lastFrame,
    frames = 0,
    lastSample = 0;
  let latest: ReturnType<PhysicsEngine["diagnostics"]>,
    latestCompare: ReturnType<PhysicsEngine["diagnostics"]>;
  const components = (): Components => ({
    halo: input("chk-halo").checked,
    disk: input("chk-disk").checked,
    bulge: input("chk-bulge").checked,
  });
  function refreshPause() {
    el("btn-pause").textContent = paused ? "▶" : "Ⅱ";
    el("btn-pause").setAttribute(
      "aria-label",
      paused ? "Continuar simulação" : "Pausar simulação",
    );
    el("run-status").textContent = fault
      ? "ATENÇÃO NUMÉRICA"
      : paused
        ? "PAUSADO"
        : "INTEGRANDO";
  }
  function snapshot(): Sample {
    const s = primary.state,
      k = cylindricalVelocity(s.q, s.v),
      rotation = rotationAt(primary.field, k.R),
      comparisonR = Math.hypot(comparison.state.q[0], comparison.state.q[1]);
    return {
      t: s.t,
      K: latest.K,
      phi: latest.phi,
      E: latest.E,
      Lz: latest.Lz,
      energyError: latest.energyError,
      angularError: latest.angularError,
      comparisonE: latestCompare.E,
      comparisonError: latestCompare.energyError,
      R: k.R,
      comparisonR,
      separation: spatialSeparation(primary.state, comparison.state),
      z: s.q[2],
      vR: k.vR,
      vPhi: k.vPhi,
      vz: k.vz,
      speed: speedKmS(s.v),
      vc: rotation.total,
      discrepancy: rotation.discrepancy,
      fBar: rotation.fBar,
      fHalo: rotation.fHalo,
      dynamicMassEquivalent: rotation.dynamicMassEquivalent,
    };
  }
  function telemetry() {
    const s = primary.state,
      row = snapshot(),
      a = primary.field.acceleration(s.q),
      rotation = rotationAt(primary.field, row.R),
      components = primary.field.accelerationComponents(s.q),
      kin = cylindricalVelocity(s.q, s.v);
    el("t-time").textContent = s.t.toFixed(3);
    el("t-radius").textContent = row.R.toFixed(3);
    el("t-height").textContent = s.q[2].toFixed(4);
    el("t-vel").textContent = row.speed.toFixed(2);
    el("t-acc").textContent = internalAccelerationToKmS2PerKpc(Math.hypot(...a)).toExponential(2);
    el("velocity-components").textContent =
      `v = (${vectorInternalVelocityToKmS(s.v).map((value) => value.toFixed(2)).join(", ")}) km/s · vR ${kin.vR.toFixed(2)} · vφ ${kin.vPhi.toFixed(2)} · vz ${kin.vz.toFixed(2)} km/s`;
    el("t-energy").textContent = `${latest.E.toFixed(1)} (km/s)²`;
    el("t-lz").textContent = `${latest.Lz.toFixed(2)} kpc km/s`;
    el("t-error").textContent = latest.maxEnergy.toExponential(2);
    el("t-lerror").textContent = latest.maxAngular.toExponential(2);
    el("t-step").textContent = `${(h * 1000).toFixed(4)} Myr`;
    el("t-vc").textContent = `${rotation.total.toFixed(2)} km/s`;
    el("t-discrepancy").textContent = Number.isFinite(rotation.discrepancy)
      ? rotation.discrepancy.toFixed(3)
      : "—";
    el("t-fbar").textContent = Number.isFinite(rotation.fBar)
      ? `${(100 * rotation.fBar).toFixed(1)}%`
      : "—";
    el("t-fhalo").textContent = Number.isFinite(rotation.fHalo)
      ? `${(100 * rotation.fHalo).toFixed(1)}%`
      : "—";
    el("t-dynmass").textContent = `${rotation.dynamicMassEquivalent.toExponential(3)} M☉`;
    el("t-separation").textContent = `${row.separation.toFixed(3)} kpc`;
    const formatVector = (v: [number, number, number]) =>
      `(${v.map((value) => value.toExponential(2)).join(", ")})`;
    el("vector-readout").innerHTML = [
      ["v", formatVector(vectorInternalVelocityToKmS(s.v) as [number, number, number]), `${row.speed.toFixed(2)} km/s`],
      ...(["disk", "bulge", "halo", "total"] as const).map((key) => [
        key === "total" ? "a total" : `a ${key}`,
        formatVector(vectorInternalAccelerationToKmS2PerKpc(components[key]) as [number, number, number]),
        `${internalAccelerationToKmS2PerKpc(Math.hypot(...components[key])).toExponential(2)} (km/s)²/kpc`,
      ]),
    ]
      .map(([name, vector, magnitude]) => `<div title="${name}: ${magnitude}"><span>${name}</span><b>${vector}</b><small>${magnitude}</small></div>`)
      .join("");
    const primarySummary = primaryTrajectory.summary(primary.monitor.baseline.E < 0);
    const comparisonSummary = comparisonTrajectory.summary(comparison.monitor.baseline.E < 0);
    const primaryName = scenarioLabel(primary.field.components), comparisonName = scenarioLabel(comparison.field.components);
    el("primary-scenario-label").textContent = primaryName;
    el("comparison-scenario-label").textContent = comparisonName;
    el("split-primary").textContent = primaryName + " · Mesmas condições iniciais";
    el("split-comparison").textContent = comparisonName + " · Mesmas condições iniciais";
    const diagnosticText = (engine: PhysicsEngine, d: typeof latest) => {
      const start = initialDiagnostics(initial, engine.field);
      const ratio = (v: number | null) => v === null ? "indefinido (referência zero)" : v.toExponential(3);
      return start.binding + " (E₀ = " + start.E.toFixed(2) + " (km/s)²). E(t) = " + d.E.toFixed(2) + " (km/s)²; Lz(t) = " + d.Lz.toFixed(3) + " kpc km/s. ΔE/E₀ = " + ratio(d.relativeEnergy) + "; ΔLz/Lz₀ = " + ratio(d.relativeAngular) + ". Máximos absolutos: " + ratio(d.maxRelativeEnergy) + " e " + ratio(d.maxRelativeAngular) + ".";
    };
    el("primary-binding").textContent = diagnosticText(primary, latest);
    el("comparison-binding").textContent = diagnosticText(comparison, latestCompare);
    const summaryRow = (id: string, value: number | null, digits = 3, unit = "") => {
      el(id).textContent = value === null || !Number.isFinite(value)
        ? "—"
        : `${value.toFixed(digits)}${unit}`;
    };
    summaryRow("m-rmin", primarySummary.rMin, 3, " kpc");
    summaryRow("m-rmax", primarySummary.rMax, 3, " kpc");
    summaryRow("m-pericenter", primarySummary.pericenter, 3, " kpc");
    summaryRow("m-apocenter", primarySummary.apocenter, 3, " kpc");
    if (primary.monitor.baseline.E >= 0) el("m-apocenter").textContent = "Apoastro não definido — trajetória não ligada";
    else if (primarySummary.apocenter === null) el("m-apocenter").textContent = "Ainda não detectado";
    summaryRow("m-ecc", primarySummary.eccentricity, 4);
    summaryRow("m-speed", primarySummary.meanSpeed, 2, " km/s");
    summaryRow("m-rperiod", primarySummary.radialPeriod, 3, " Gyr");
    summaryRow("m-aperiod", primarySummary.azimuthalPeriod, 3, " Gyr");
    summaryRow("m-phase", primarySummary.phaseAdvance, 3, " rad");
    summaryRow("c-rmin", comparisonSummary.rMin, 3, " kpc");
    summaryRow("c-rmax", comparisonSummary.rMax, 3, " kpc");
    summaryRow("c-pericenter", comparisonSummary.pericenter, 3, " kpc");
    summaryRow("c-apocenter", comparisonSummary.apocenter, 3, " kpc");
    if (comparison.monitor.baseline.E >= 0) el("c-apocenter").textContent = "Apoastro não definido — trajetória não ligada";
    else if (comparisonSummary.apocenter === null) el("c-apocenter").textContent = "Ainda não detectado";
    summaryRow("c-ecc", comparisonSummary.eccentricity, 4);
    summaryRow("c-speed", comparisonSummary.meanSpeed, 2, " km/s");
    summaryRow("c-rperiod", comparisonSummary.radialPeriod, 3, " Gyr");
    summaryRow("c-aperiod", comparisonSummary.azimuthalPeriod, 3, " Gyr");
    summaryRow("c-phase", comparisonSummary.phaseAdvance, 3, " rad");
    summaryRow(
      "phase-difference",
      primarySummary.phaseAdvance - comparisonSummary.phaseAdvance,
      3,
      " rad",
    );
    charts.setCurrentRadius(row.R);
    const warning = latest.warning || latestCompare.warning;
    el("numerical-status").classList.toggle("warning", warning || fault);
    el("numerical-status").textContent =
      faultMessage ||
      (warning
        ? latest.domainError || latestCompare.domainError
          ? "Pausado: trajetória fora do domínio operacional de 0,5–50 kpc. Isso não prova instabilidade física."
          : "Pausado: limite numérico excedido. Reinicie com maior resolução temporal."
        : `Precisão dentro dos limites · |ΔE|/escala < ${NUMERICS.energyTolerance} · hω ${latest.resolution.toFixed(4)}`);
    el("compare-status").textContent =
      `Potencial bariônico · t=${comparison.state.t.toFixed(3)} Gyr · máx. ΔE=${latestCompare.maxEnergy.toExponential(2)} · máx. ΔLz=${latestCompare.maxAngular.toExponential(2)}. Mesmo estado inicial.`;
    if (clock.debt > h * clock.maxStepsPerFrame)
      el("run-status").textContent = "RITMO LIMITADO PELA CPU";
  }
  function reset() {
    const p = new GalacticPotential(components());
    preset = (el("preset") as HTMLSelectElement).value as Preset;
    const R = preset === "solar" ? SOLAR.R : Number(input("radius").value);
    // Preset defined once in the full three-component model; switches change only the field.
    const reference = new GalacticPotential();
    const next = initialConditions(reference, preset, R),
      dt = chooseStep(p, R);
    const compareField = new GalacticPotential({
      ...p.components,
      halo: false,
    });
    const f = compareField.frequencies(R),
      compareFrequency = Math.sqrt(Math.max(f.omega2, f.kappa2, f.nu2));
    h =
      (compareFrequency > 0
        ? Math.min(
            dt,
            (2 * Math.PI) / (NUMERICS.samplesPerFastPeriod * compareFrequency),
          )
        : dt) / Number((el("resolution") as HTMLSelectElement).value);
    initial = copyState(next);
    ({ primary, comparison } = createComparison(p.components, next));
    const startFull = initialDiagnostics(initial, reference), startBar = initialDiagnostics(initial, new GalacticPotential({ ...reference.components, halo: false }));
    el("initial-comparison").textContent = `Mesmas condições iniciais: R₀=${R.toFixed(3)} kpc; z₀=${initial.q[2].toFixed(4)} kpc; vR₀=${startFull.vR.toFixed(2)}, vφ₀=${startFull.vPhi.toFixed(2)}, vz₀=${startFull.vz.toFixed(2)} km/s. |v₀|=${startFull.speed.toFixed(2)} km/s. vc,completo(R₀)=${startFull.vc.toFixed(2)} km/s; vc,bariônico(R₀)=${startBar.vc.toFixed(2)} km/s (z=0). Desvio |v₀|/vc,completo − 1 = ${(100 * (startFull.relativeSpeedOffset ?? 0)).toFixed(2)}%.`;
    primaryTrajectory = new TrajectoryRecorder();
    comparisonTrajectory = new TrajectoryRecorder();
    primaryTrajectory.record(primary.state);
    comparisonTrajectory.record(comparison.state);
    steps = 0;
    lastSample = 0;
    clock.reset();
    fault = false;
    faultMessage = "";
    paused = false;
    trail.clear();
    comparisonTrail.clear();
    trail.addPoint(next.q);
    comparisonTrail.addPoint(next.q);
    latest = primary.diagnostics(h);
    latestCompare = comparison.diagnostics(h);
    charts.reset(p);
    charts.setCurrentRadius(R);
    charts.add(snapshot());
    charts.render();
    input("radius").disabled = preset === "solar";
    if (preset === "solar") input("radius").value = String(SOLAR.R);
    el("preset-note").textContent =
      preset === "solar"
        ? "R, z e movimento peculiar solares com fontes. vφ = vc do potencial completo + V☉; estado inicial preservado entre campos."
        : preset === "circular"
          ? "z = vR = vz = 0; vφ calculada no potencial completo; estado inicial preservado entre campos."
          : "Perturbação experimental vR = 0,01 vc; não é excentricidade observada.";
    refreshPause();
    telemetry();
    vectors.update(primary.state, primary.field);
    comparisonVectors.update(comparison.state, comparison.field);
  }
  function safeReset() {
    try {
      reset();
    } catch (error) {
      paused = true;
      fault = true;
      faultMessage = String(error);
      refreshPause();
      telemetry();
    }
  }
  reset();
  for (const key of ["halo", "disk", "bulge"])
    input(`chk-${key}`).onchange = () => {
      if (!Object.values(components()).some(Boolean)) {
        input(`chk-${key}`).checked = true;
        el("numerical-status").textContent =
          "Mantenha ao menos uma componente no cenário principal.";
        return;
      }
      safeReset();
    };
  (el("preset") as HTMLSelectElement).onchange = () => {
    input("radius").disabled =
      (el("preset") as HTMLSelectElement).value === "solar";
    safeReset();
  };
  el("btn-apply").onclick = safeReset;
  el("btn-reset").onclick = safeReset;
  (el("resolution") as HTMLSelectElement).onchange = safeReset;
  el("btn-pause").onclick = () => {
    if (fault) return;
    paused = !paused;
    clock.reset();
    refreshPause();
  };
  input("sl-speed").oninput = () => {
    el("lbl-speed").textContent =
      `${(0.02 * Number(input("sl-speed").value)).toFixed(2)} Gyr/s`;
  };
  el("btn-split").onclick = () => {
    gfx.setSplit(!gfx.splitMode);
    document.body.classList.toggle("split", gfx.splitMode);
    el("split-labels").hidden = !gfx.splitMode;
    el("btn-split").setAttribute("aria-pressed", String(gfx.splitMode));
    comparisonVectors.setVisible(gfx.splitMode && input("chk-didactic").checked);
  };
  el("btn-cam-sun").onclick = () => {
    follow = true;
    el("btn-cam-sun").classList.add("active");
  };
  for (const [id, mode] of [
    ["btn-cam-orbit", "global"],
    ["btn-top", "top"],
    ["btn-edge", "edge"],
  ] as const)
    el(id).onclick = () => {
      follow = false;
      el("btn-cam-sun").classList.remove("active");
      gfx.view(mode);
    };
  input("chk-visual").onchange = () => {
    galaxy.group.visible = input("chk-visual").checked;
  };
  input("chk-didactic").onchange = () => {
    const visible = input("chk-didactic").checked;
    vectors.setVisible(visible);
    comparisonVectors.setVisible(visible && gfx.splitMode);
  };
  (el("quality") as HTMLSelectElement).onchange = () =>
    galaxy.build(Number((el("quality") as HTMLSelectElement).value));
  for (const mode of ["energy", "rotation", "errors", "evidence"] as const)
    el(`tab-${mode}`).onclick = () => {
      charts.setMode(mode);
      for (const b of document.querySelectorAll(".tabs button"))
        b.classList.remove("active");
      el(`tab-${mode}`).classList.add("active");
    };
  el("btn-export").onclick = () =>
    downloadJSON({
      schemaVersion: 2,
      model: MODEL,
      components: primary.field.components,
      comparison: comparison.field.components,
      initial,
      state: primary.state,
      comparisonState: comparison.state,
      scenario: scenarioLabel(primary.field.components),
      comparisonScenario: scenarioLabel(comparison.field.components),
      initialDiagnostics: initialDiagnostics(initial, primary.field),
      comparisonInitialDiagnostics: initialDiagnostics(initial, comparison.field),
      preset,
      stepGyr: h,
      numerics: NUMERICS,
      units: {
        position: "kpc",
        velocity: "kpc/Gyr",
        time: "Gyr",
        sampleVelocity: "km/s",
        energy: "(km/s)^2",
        angularMomentum: "kpc km/s",
      },
      parameters: PARAMETER_ROWS,
      physicalParameters: PHYSICAL_PARAMETERS,
      references: REFERENCES,
      diagnostics: latest,
      comparisonDiagnostics: latestCompare,
      trajectory: primaryTrajectory.summary(primary.monitor.baseline.E < 0),
      comparisonTrajectory: comparisonTrajectory.summary(comparison.monitor.baseline.E < 0),
      separation: charts.samples.map((sample) => ({ t: sample.t, kpc: sample.separation })),
      samples: charts.samples,
      samplingNote:
        "Amostras a cada 16 passos; retém as últimas 12000. Visuais não exportados como dados físicos.",
    });
  document.addEventListener("visibilitychange", () => {
    lastFrame = performance.now();
    clock.reset();
  });
  gfx.renderer.domElement.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    paused = true;
    fault = true;
    faultMessage =
      "Contexto WebGL perdido. Recarregue a página para reconstruir os buffers.";
    refreshPause();
  });
  function animate(now: number) {
    requestAnimationFrame(animate);
    const seconds = (now - lastFrame) / 1000;
    lastFrame = now;
    if (document.hidden) return;
    if (!paused) {
      try {
        clock.advance(
          seconds,
          0.02 * Number(input("sl-speed").value),
          h,
          () => {
            primary.step(h);
            comparison.step(h);
            primaryTrajectory.record(primary.state);
            comparisonTrajectory.record(comparison.state);
            steps++;
            latest = primary.diagnostics(h);
            latestCompare = comparison.diagnostics(h);
            if (steps % 16 === 0) {
              trail.addPoint(primary.state.q);
              comparisonTrail.addPoint(comparison.state.q);
              charts.add(snapshot());
              lastSample = steps;
            }
            if (latest.warning || latestCompare.warning) {
              paused = true;
              fault = true;
              if (lastSample !== steps) charts.add(snapshot());
              refreshPause();
              telemetry();
              return false;
            }
            return true;
          },
        );
      } catch (error) {
        paused = true;
        fault = true;
        faultMessage = `Integração interrompida: ${String(error)}`;
        refreshPause();
      }
    }
    marker.update(primary.state.q, gfx.camera1);
    comparisonMarker.update(comparison.state.q, gfx.camera2);
    vectors.update(primary.state, primary.field);
    comparisonVectors.update(comparison.state, comparison.field);
    if (follow) {
      const k = 1 - Math.exp(-seconds * 4);
      gfx.controls1.target.lerp(marker.mesh.position, k);
      gfx.controls2.target.lerp(comparisonMarker.mesh.position, k);
    }
    if (now - lastUi > 100) {
      telemetry();
      lastUi = now;
    }
    if (now - lastChart > 300) {
      charts.render();
      lastChart = now;
    }
    gfx.render();
    frames++;
    if (now - lastFps > 1000) {
      el("performance").textContent =
        `${Math.round((frames * 1000) / (now - lastFps))} FPS medidos · ${Math.round(gfx.renderer.info.render.points / 1000)} mil pontos/vista`;
      frames = 0;
      lastFps = now;
    }
  }
  requestAnimationFrame(animate);
  // Read-only snapshot for reproducible browser validation, no mutation API.
  Object.defineProperty(window, "galacticSnapshot", {
    value: () => ({
      state: copyState(primary.state),
      comparison: copyState(comparison.state),
      diagnostics: { ...latest },
      comparisonDiagnostics: { ...latestCompare },
      h,
      paused,
      fault,
      components: { ...primary.field.components },
      split: gfx.splitMode,
      trajectory: primaryTrajectory.summary(primary.monitor.baseline.E < 0),
      comparisonTrajectory: comparisonTrajectory.summary(comparison.monitor.baseline.E < 0),
    }),
    writable: false,
  });
}
try {
  start();
} catch (error) {
  el("run-status").textContent = "INICIALIZAÇÃO INTERROMPIDA";
  el("numerical-status").textContent =
    `Não foi possível iniciar: ${String(error)}`;
  console.error(error);
}
