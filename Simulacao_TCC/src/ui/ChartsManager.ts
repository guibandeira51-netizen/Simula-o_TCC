import Chart from "chart.js/auto";
import { GalacticPotential, type Components } from "../physics/potentials";
import { G, MODEL, NUMERICS } from "../data/parameters";
import { OBSERVATIONS } from "../data/observations";
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
  z: number;
  vR: number;
  vPhi: number;
  vz: number;
}
export class ChartsManager {
  chart: Chart<"line">;
  mode: "energy" | "rotation" | "errors" = "energy";
  samples: Sample[] = [];
  field = new GalacticPotential();
  constructor() {
    Chart.defaults.color = "#8999ad";
    Chart.defaults.font.family = "DM Sans, sans-serif";
    Chart.defaults.font.size = 9;
    this.chart = new Chart(
      document.getElementById("scienceChart") as HTMLCanvasElement,
      {
        type: "line",
        data: { datasets: [] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          normalized: true,
          parsing: false,
          plugins: {
            legend: {
              labels: {
                boxWidth: 9,
                boxHeight: 2,
                padding: 8,
                font: { size: 8 },
              },
            },
          },
          scales: {
            x: {
              type: "linear",
              grid: { color: "#ffffff06" },
              ticks: { maxTicksLimit: 5 },
            },
            y: { grid: { color: "#ffffff09" }, ticks: { maxTicksLimit: 5 } },
          },
        },
      },
    );
  }
  setMode(mode: typeof this.mode) {
    this.mode = mode;
    this.render();
  }
  reset(field: GalacticPotential) {
    this.field = field;
    this.samples = [];
    this.render();
  }
  add(s: Sample) {
    this.samples.push(s);
    if (this.samples.length > 12000) this.samples.shift();
  }
  render() {
    const colors = [
      "#e9bd7f",
      "#9bbde5",
      "#91c9b8",
      "#ed97af",
      "#ad99d1",
      "#e8e8e8",
    ];
    const series = (
      label: string,
      data: { x: number; y: number }[],
      i: number,
      dash = false,
    ) => ({
      label,
      data,
      borderColor: colors[i],
      borderWidth: 1.4,
      pointRadius: 0,
      borderDash: dash ? [4, 3] : [],
    });
    if (this.mode === "rotation") {
      const radii = Array.from(
        { length: 160 },
        (_, i) =>
          NUMERICS.minRadius +
          ((NUMERICS.maxRadius - NUMERICS.minRadius) * i) / 159,
      );
      const bary = new GalacticPotential({
        ...this.field.components,
        halo: false,
      });
      const selectedMass =
        (this.field.components.disk ? MODEL.disk.mass : 0) +
        (this.field.components.bulge ? MODEL.bulge.mass : 0) +
        (this.field.components.nucleus ? MODEL.nucleus.mass : 0);
      const only = (key: keyof Components) =>
        new GalacticPotential({
          halo: false,
          disk: false,
          bulge: false,
          nucleus: false,
          [key]: this.field.components[key],
        });
      this.chart.data.datasets = [
        series(
          "Selecionado",
          radii.map((x) => ({ x, y: this.field.circularSpeed(x) })),
          0,
        ),
        series(
          "Sem halo",
          radii.map((x) => ({ x, y: bary.circularSpeed(x) })),
          3,
        ),
        series(
          "Halo",
          radii.map((x) => ({ x, y: only("halo").circularSpeed(x) })),
          4,
        ),
        series(
          "Disco",
          radii.map((x) => ({ x, y: only("disk").circularSpeed(x) })),
          1,
        ),
        series(
          "Kepler (massa bariônica)",
          radii.map((x) => ({ x, y: Math.sqrt((G * selectedMass) / x) })),
          5,
          true,
        ),
        ...OBSERVATIONS.map((o, i) => ({
          ...series(
            i === 0 ? "Eilers 2019" : "Reid 2019",
            [{ x: o.R, y: o.vc }],
            2 + i,
          ),
          pointRadius: 4,
          showLine: false,
        })),
      ];
      this.chart.options.scales!.x!.title = { display: true, text: "R [kpc]" };
      this.chart.options.scales!.y!.title = {
        display: true,
        text: "vc [km/s]",
      };
      document.getElementById("chart-note")!.textContent =
        "Curvas teóricas, não dados simulados. Kepler concentra a massa bariônica no centro; não equivale a retirar o halo. Pontos observacionais: fontes e incertezas em Modelo & fontes.";
    } else {
      const recent = this.samples.slice(-300),
        xy = (key: keyof Sample) => recent.map((s) => ({ x: s.t, y: s[key] }));
      this.chart.data.datasets =
        this.mode === "energy"
          ? [
              series("E total", xy("E"), 0),
              series("K", xy("K"), 1),
              series("Φ", xy("phi"), 4),
              series("E sem halo", xy("comparisonE"), 3, true),
            ]
          : [
              series("|ΔE| / escala", xy("energyError"), 0),
              series("|ΔLz| / escala", xy("angularError"), 2),
              series("ΔE sem halo", xy("comparisonError"), 3, true),
            ];
      this.chart.options.scales!.x!.title = { display: true, text: "t [Gyr]" };
      this.chart.options.scales!.y!.title = {
        display: true,
        text:
          this.mode === "energy"
            ? "Energia específica [(km/s)²]"
            : "Erro normalizado",
      };
      document.getElementById("chart-note")!.textContent =
        this.mode === "energy"
          ? "E = K + Φ. Energias por unidade de massa; os cenários têm potenciais diferentes e energias iniciais diferentes."
          : "Máximos históricos são monitorados a cada passo. Escala E = max(|E₀|,K₀); escala L = max(|Lz₀|,|r₀||v₀|).";
    }
    this.chart.update("none");
  }
}
