import Chart from "chart.js/auto";
import { OBSERVATIONS } from "../data/observations";
import { NUMERICS } from "../data/parameters";
import {
  rotationAt,
  rotationCurve,
  COMPONENT_KEYS,
  type RotationSample,
} from "../physics/circularVelocity";
import { GalacticPotential } from "../physics/potentials";

export interface Sample {
  t: number;
  K: number;
  phi: number;
  E: number;
  Lz: number;
  energyError: number;
  angularError: number;
  comparisonE: number;
  comparisonError: number;
  R: number;
  comparisonR: number;
  separation: number;
  z: number;
  vR: number;
  vPhi: number;
  vz: number;
  speed: number;
  vc: number;
  discrepancy: number;
  fBar: number;
  fHalo: number;
  dynamicMassEquivalent: number;
}

type Mode = "energy" | "rotation" | "errors" | "evidence";
type XY = { x: number; y: number };

const colors = {
  disk: "#8dbbe9",
  bulge: "#e8a86c",
  nucleus: "#f5d58b",
  halo: "#a8a3dc",
  baryonic: "#77c8ae",
  total: "#f0f2f6",
  observation: "#ef91ae",
  marker: "#e9bd7f",
  comparison: "#ee91a8",
};

const line = (label: string, data: XY[], color: string, dash: number[] = []) => ({
  label,
  data,
  borderColor: color,
  backgroundColor: color,
  borderWidth: 1.5,
  pointRadius: 0,
  borderDash: dash,
  tension: 0.12,
  parsing: false as const,
});

function configureAxes(chart: Chart<"line">, x: string, y: string) {
  const scales = chart.options.scales as any;
  scales.x.title = { display: true, text: x };
  scales.y.title = { display: true, text: y };
}

function makeChart(canvasId: string): Chart<"line"> {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) throw new Error(`Canvas ausente: ${canvasId}`);
  return new Chart(canvas, {
    type: "line",
    data: { datasets: [] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      normalized: true,
      parsing: false,
      interaction: { mode: "nearest", intersect: false },
      plugins: {
        legend: {
          labels: { boxWidth: 9, boxHeight: 2, padding: 8, font: { size: 8 } },
        },
        tooltip: { callbacks: {} },
      },
      scales: {
        x: { type: "linear", grid: { color: "#ffffff06" }, ticks: { maxTicksLimit: 5 } },
        y: { grid: { color: "#ffffff09" }, ticks: { maxTicksLimit: 5 } },
      },
    },
  });
}

export class ChartsManager {
  chart: Chart<"line">;
  discrepancyChart: Chart<"line">;
  separationChart: Chart<"line">;
  mode: Mode = "energy";
  samples: Sample[] = [];
  field = new GalacticPotential();
  currentRadius: number = NUMERICS.minRadius;
  private rotationCache: RotationSample[] = [];
  private rotationCacheKey = "";

  constructor() {
    Chart.defaults.color = "#8999ad";
    Chart.defaults.font.family = "DM Sans, sans-serif";
    Chart.defaults.font.size = 9;
    this.chart = makeChart("scienceChart");
    this.discrepancyChart = makeChart("discrepancyChart");
    this.separationChart = makeChart("separationChart");
  }

  setMode(mode: Mode) {
    this.mode = mode;
    document.getElementById("evidence-panel")?.toggleAttribute("hidden", mode !== "evidence");
    this.render();
  }

  reset(field: GalacticPotential) {
    this.field = field;
    this.samples = [];
    this.rotationCacheKey = "";
    this.render();
  }

  setCurrentRadius(R: number) {
    this.currentRadius = R;
  }

  add(sample: Sample) {
    this.samples.push(sample);
    if (this.samples.length > 12000) this.samples.shift();
  }

  render() {
    if (this.mode === "rotation" || this.mode === "evidence") this.renderRotation();
    else this.renderTimeSeries();
    if (this.mode === "evidence") this.renderEvidenceCharts();
    this.chart.update("none");
  }

  private renderRotation() {
    const key = JSON.stringify(this.field.components);
    if (key !== this.rotationCacheKey) {
      this.rotationCache = rotationCurve(this.field);
      this.rotationCacheKey = key;
    }
    const current = rotationAt(this.field, this.currentRadius);
    const maxY = Math.max(...this.rotationCache.map((r) => r.total), current.total, 1);
    const points = (name: keyof RotationSample) =>
      this.rotationCache.map((r) => ({ x: r.R, y: r[name] as number }));
    const componentLabel: Record<string, string> = {
      disk: "Disco",
      bulge: "Bojo",
      nucleus: "Núcleo",
      halo: "Halo",
    };
    const componentColor: Record<string, string> = {
      disk: colors.disk,
      bulge: colors.bulge,
      nucleus: colors.nucleus,
      halo: colors.halo,
    };
    const datasets: any[] = COMPONENT_KEYS.map((key) =>
      line(componentLabel[key], points(key), componentColor[key]),
    );
    datasets.push(
      line("Matéria bariônica", points("baryonic"), colors.baryonic),
      line("Modelo total", points("total"), colors.total),
      {
        ...line(
          "R atual",
          [{ x: this.currentRadius, y: 0 }, { x: this.currentRadius, y: maxY }],
          colors.marker,
          [3, 3],
        ),
        pointRadius: 0,
      },
      {
        label: `vc(R atual) = ${current.total.toFixed(1)} km/s`,
        data: [{ x: this.currentRadius, y: current.total }],
        borderColor: colors.marker,
        backgroundColor: colors.marker,
        pointRadius: 4,
        showLine: false,
      },
      ...OBSERVATIONS.map((o) => ({
        label: `${o.source.title} · ±${o.uncertaintyKmS} km/s`,
        data: [{ x: o.radiusKpc, y: o.velocityKmS }],
        borderColor: colors.observation,
        backgroundColor: colors.observation,
        pointRadius: 4,
        showLine: false,
        observation: o,
      })),
    );
    for (const dataset of datasets) {
      const key = Object.entries(componentLabel).find(([, value]) => value === dataset.label)?.[0];
      if (key) dataset.hidden = !this.field.components[key as keyof typeof this.field.components];
    }
    this.chart.data.datasets = datasets;
    configureAxes(this.chart, "R [kpc]", "vc [km/s]");
    (this.chart.options.plugins as any).tooltip.callbacks = {
      label: (context: any) => {
        const observation = context.dataset.observation;
        return observation
          ? `${observation.source.title}: ${observation.velocityKmS} ± ${observation.uncertaintyKmS} km/s`
          : `${context.dataset.label}: ${Number(context.parsed.y).toFixed(2)} km/s`;
      },
    };
    document.getElementById("chart-note")!.textContent =
      "Componentes somadas em vc². A linha tracejada marca o raio atual; os pontos são restrições observacionais independentes, não dados gerados pela simulação.";
  }

  private renderTimeSeries() {
    const recent = this.samples.slice(-300);
    const xy = (key: keyof Sample) => recent.map((sample) => ({ x: sample.t, y: sample[key] as number }));
    this.chart.data.datasets =
      this.mode === "energy"
        ? [
            line("E total", xy("E"), colors.total),
            line("K", xy("K"), colors.disk),
            line("Φ", xy("phi"), colors.halo),
            line("E sem halo", xy("comparisonE"), colors.comparison, [4, 3]),
          ]
        : [
            line("|ΔE| / escala", xy("energyError"), colors.marker),
            line("|ΔLz| / escala", xy("angularError"), colors.bulge),
            line("ΔE sem halo", xy("comparisonError"), colors.comparison, [4, 3]),
          ];
    configureAxes(
      this.chart,
      "t [Gyr]",
      this.mode === "energy" ? "Energia específica [(km/s)²]" : "Erro normalizado",
    );
    document.getElementById("chart-note")!.textContent =
      this.mode === "energy"
        ? "E = K + Φ. As energias são específicas; os dois cenários têm potenciais diferentes."
        : "Máximos históricos de energia e Lz são monitorados a cada passo de integração.";
  }

  private renderEvidenceCharts() {
    const current = rotationAt(this.field, this.currentRadius);
    const maxD = Math.max(
      ...this.rotationCache.map((r) => (Number.isFinite(r.discrepancy) ? r.discrepancy : 0)),
      Number.isFinite(current.discrepancy) ? current.discrepancy : 1,
      1,
    );
    this.discrepancyChart.data.datasets = [
      line(
        "D(R) = vtotal² / vbar²",
        this.rotationCache.map((r) => ({ x: r.R, y: r.discrepancy })),
        colors.marker,
      ),
      line(
        "R atual",
        [{ x: this.currentRadius, y: 0 }, { x: this.currentRadius, y: maxD }],
        colors.total,
        [3, 3],
      ),
      {
        label: `D(R atual) = ${current.discrepancy.toFixed(3)}`,
        data: [{ x: this.currentRadius, y: current.discrepancy }],
        borderColor: colors.marker,
        backgroundColor: colors.marker,
        pointRadius: 4,
        showLine: false,
      },
    ];
    configureAxes(this.discrepancyChart, "R [kpc]", "Discrepância dinâmica D(R)");
    this.discrepancyChart.update("none");
    this.separationChart.data.datasets = [
      line(
        "Δr(t) · halo − sem halo",
        this.samples.map((sample) => ({ x: sample.t, y: sample.separation })),
        colors.comparison,
      ),
    ];
    configureAxes(this.separationChart, "t [Gyr]", "Δr [kpc]");
    this.separationChart.update("none");
  }
}
