import "./style.css";
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
  NUMERICS,
  SOLAR,
  VELOCITY,
  PARAMETER_ROWS,
  REFERENCES,
} from "./data/parameters";
import { GraphicsCore } from "./graphics/Renderer";
import { Galaxy } from "./entities/Galaxy";
import { SunEntity } from "./entities/Sun";
import { OrbitTrail } from "./entities/OrbitTrail";
import { DeepSpace } from "./entities/DeepSpace";
import { ChartsManager, type Sample } from "./ui/ChartsManager";
import { populateSources, downloadJSON } from "./ui/UIManager";
import { SimulationClock } from "./simulation/Clock";
const el = (id: string) => document.getElementById(id)!;
const input = (id: string) => el(id) as HTMLInputElement;
populateSources();

function start() {
  const gfx = new GraphicsCore();
  new DeepSpace(gfx.scene);
  const galaxy = new Galaxy(gfx.scene);
  const marker = new SunEntity(gfx.scene, 0xf5c47b, 1),
    comparisonMarker = new SunEntity(gfx.scene, 0xee91a8, 2);
  const trail = new OrbitTrail(gfx.scene, 0xf5c47b, 1),
    comparisonTrail = new OrbitTrail(gfx.scene, 0xee91a8, 2);
  const charts = new ChartsManager(),
    clock = new SimulationClock();
  let primary: PhysicsEngine,
    comparison: PhysicsEngine,
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
    nucleus: input("chk-nucleus").checked,
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
      R = Math.hypot(s.q[0], s.q[1]);
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
      R,
      z: s.q[2],
      vR: (s.q[0] * s.v[0] + s.q[1] * s.v[1]) / R / VELOCITY,
      vPhi: (s.q[0] * s.v[1] - s.q[1] * s.v[0]) / R / VELOCITY,
      vz: s.v[2] / VELOCITY,
    };
  }
  function telemetry() {
    const s = primary.state,
      row = snapshot(),
      a = primary.field.acceleration(s.q);
    el("t-time").textContent = s.t.toFixed(3);
    el("t-radius").textContent = row.R.toFixed(3);
    el("t-height").textContent = s.q[2].toFixed(4);
    el("t-vel").textContent = (Math.hypot(...s.v) / VELOCITY).toFixed(2);
    el("t-acc").textContent = Math.hypot(...a).toExponential(2);
    el("velocity-components").textContent =
      `vR ${row.vR.toFixed(2)} · vφ ${row.vPhi.toFixed(2)} · vz ${row.vz.toFixed(2)} km/s`;
    el("t-energy").textContent = `${latest.E.toFixed(1)} (km/s)²`;
    el("t-lz").textContent = `${latest.Lz.toFixed(2)} kpc km/s`;
    el("t-error").textContent = latest.maxEnergy.toExponential(2);
    el("t-lerror").textContent = latest.maxAngular.toExponential(2);
    el("t-step").textContent = `${(h * 1000).toFixed(4)} Myr`;
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
      `Sem halo · t=${comparison.state.t.toFixed(3)} Gyr · máx. ΔE=${latestCompare.maxEnergy.toExponential(2)} · máx. ΔLz=${latestCompare.maxAngular.toExponential(2)}. Mesmo estado inicial.`;
    if (clock.debt > h * clock.maxStepsPerFrame)
      el("run-status").textContent = "RITMO LIMITADO PELA CPU";
  }
  function reset() {
    const p = new GalacticPotential(components());
    preset = (el("preset") as HTMLSelectElement).value as Preset;
    const R = preset === "solar" ? SOLAR.R : Number(input("radius").value);
    const next = initialConditions(p, preset, R),
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
    primary = new PhysicsEngine(p, next);
    comparison = new PhysicsEngine(compareField, next);
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
    charts.add(snapshot());
    charts.render();
    input("radius").disabled = preset === "solar";
    if (preset === "solar") input("radius").value = String(SOLAR.R);
    el("preset-note").textContent =
      preset === "solar"
        ? "R, z e movimento peculiar solares com fontes. vφ = vc do modelo + V☉."
        : preset === "circular"
          ? "z = vR = vz = 0; vφ calculada no campo selecionado."
          : "Perturbação experimental vR = 0,01 vc; não é excentricidade observada.";
    refreshPause();
    telemetry();
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
  for (const key of ["halo", "disk", "bulge", "nucleus"])
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
  (el("quality") as HTMLSelectElement).onchange = () =>
    galaxy.build(Number((el("quality") as HTMLSelectElement).value));
  for (const mode of ["energy", "rotation", "errors"] as const)
    el(`tab-${mode}`).onclick = () => {
      charts.setMode(mode);
      for (const b of document.querySelectorAll(".tabs button"))
        b.classList.remove("active");
      el(`tab-${mode}`).classList.add("active");
    };
  el("btn-export").onclick = () =>
    downloadJSON({
      schemaVersion: 1,
      model: MODEL,
      components: primary.field.components,
      comparison: comparison.field.components,
      initial,
      state: primary.state,
      comparisonState: comparison.state,
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
      references: REFERENCES,
      diagnostics: latest,
      comparisonDiagnostics: latestCompare,
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
