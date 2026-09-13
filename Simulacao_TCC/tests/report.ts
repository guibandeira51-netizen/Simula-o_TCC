import { writeFileSync, mkdirSync } from "node:fs";
import { GalacticPotential, ALL } from "../src/physics/potentials";
import {
  initialConditions,
  chooseStep,
} from "../src/physics/initialConditions";
import { leapfrog, copyState } from "../src/physics/integrator";
import { Monitor } from "../src/physics/diagnostics";
import { G, MODEL, SOLAR, VELOCITY } from "../src/data/parameters";
import { OBSERVATIONS } from "../src/data/observations";
import { PhysicsEngine as Legacy } from "./fixtures/legacy";
const full = new GalacticPotential();
const circular = [0.5, 1, 2, 5, 8.178, 15, 30, 50].map((R) => {
  const s = initialConditions(full, "circular", R),
    h = chooseStep(full, R),
    m = new Monitor(s, full),
    T = (2 * Math.PI * R) / (full.circularSpeed(R) * VELOCITY);
  let radial = 0;
  for (let i = 0; i < Math.ceil((10 * T) / h); i++) {
    leapfrog(s, h, full);
    radial = Math.max(radial, Math.abs(Math.hypot(s.q[0], s.q[1]) - R) / R);
    m.measure(s, full, h);
  }
  return {
    R,
    vc: full.circularSpeed(R),
    periodMyr: T * 1000,
    stepMyr: h * 1000,
    maxRelativeRadius: radial,
    maxEnergy: m.maxEnergy,
    maxLz: m.maxAngular,
  };
});
const initial = initialConditions(full, "solar"),
  h = chooseStep(full, SOLAR.R);
const solar = [true, false].map((halo) => {
  const field = new GalacticPotential({ ...ALL, halo }),
    s = copyState(initial),
    m = new Monitor(s, field);
  let rmin = Infinity,
    rmax = 0,
    zmax = 0,
    maxResolution = 0;
  for (let i = 0; i < Math.ceil(5 / h); i++) {
    leapfrog(s, h, field);
    const d = m.measure(s, field, h);
    rmin = Math.min(rmin, Math.hypot(s.q[0], s.q[1]));
    rmax = Math.max(rmax, Math.hypot(s.q[0], s.q[1]));
    zmax = Math.max(zmax, Math.abs(s.q[2]));
    maxResolution = Math.max(maxResolution, d.resolution);
  }
  return {
    halo,
    durationGyr: s.t,
    maxEnergy: m.maxEnergy,
    maxLz: m.maxAngular,
    rmin,
    rmax,
    zmax,
    maxResolution,
  };
});
const convergence = [500, 1000, 2000].map((N) => {
  const s = copyState(initial),
    m = new Monitor(s, full);
  for (let i = 0; i < N; i++) {
    leapfrog(s, 0.2 / N, full);
    m.measure(s, full, 0.2 / N);
  }
  return { N, q: s.q, maxEnergy: m.maxEnergy };
});
const distance = (i: number, j: number) =>
  Math.hypot(...convergence[i].q.map((v, k) => v - convergence[j].q[k]));
const legacy = [true, false].map((halo) => {
  const p = new Legacy();
  p.useHalo = halo;
  const e0 = p.getEnergies(),
    E0 = e0.Ek + e0.Ep,
    L0 = p.x * p.vy - p.y * p.vx;
  let maxEnergy = 0,
    maxLz = 0;
  for (let i = 0; i < 5000; i++) {
    p.step(0.001);
    const e = p.getEnergies();
    maxEnergy = Math.max(maxEnergy, Math.abs(e.Ek + e.Ep - E0) / Math.abs(E0));
    maxLz = Math.max(
      maxLz,
      Math.abs(p.x * p.vy - p.y * p.vx - L0) / Math.abs(L0),
    );
  }
  return { halo, stepMyr: 1, maxEnergy, maxLz, vcInitial: p.vTotal(8.2) };
});
const constraints = OBSERVATIONS.map((o) => ({
  R: o.R,
  observed: o.vc,
  model: full.circularSpeed(o.R),
  difference: full.circularSpeed(o.R) - o.vc,
  source: o.source.url,
  note: o.note,
}));
const data = {
  baselineCommit: "56f368f1ed36c67df23c16441501c87476c2c4ab",
  model: MODEL,
  G,
  conversion: VELOCITY,
  circular,
  solar,
  convergence,
  convergenceRatio: distance(0, 1) / distance(1, 2),
  legacy,
  constraints,
};
mkdirSync("docs", { recursive: true });
writeFileSync(
  "docs/validation-results.json",
  JSON.stringify(data, null, 2) + "\n",
);
const rows = [
  "R_kpc,vc_total_km_s,vc_baryonic_km_s,vc_halo_km_s,vc_kepler_baryonic_km_s",
];
const bary = new GalacticPotential({ ...ALL, halo: false }),
  halo = new GalacticPotential({
    halo: true,
    disk: false,
    bulge: false,
    nucleus: false,
  });
for (let R = 0.5; R <= 50; R += 0.25)
  rows.push(
    [
      R,
      full.circularSpeed(R),
      bary.circularSpeed(R),
      halo.circularSpeed(R),
      Math.sqrt(
        (G * (MODEL.disk.mass + MODEL.bulge.mass + MODEL.nucleus.mass)) / R,
      ),
    ].join(","),
  );
writeFileSync("docs/rotation-curve.csv", rows.join("\n") + "\n");
const f = (n: number) => n.toExponential(3);
writeFileSync(
  "docs/VALIDACAO.md",
  `# Validação numérica reproduzível\n\nExecute \`pnpm test\` e \`pnpm validate\`. Este relatório é gerado por \`tests/report.ts\`; resultados detalhados em validation-results.json e curvas em rotation-curve.csv. Não são observações do céu.\n\n## Órbitas circulares — dez períodos por raio\n\n| R (kpc) | vc (km/s) | Período (Myr) | h (Myr) | máximo ΔR/R | máximo erro E | máximo erro Lz |\n|---|---|---|---|---|---|---|\n${circular.map((r) => `| ${r.R} | ${r.vc.toFixed(3)} | ${r.periodMyr.toFixed(3)} | ${r.stepMyr.toFixed(5)} | ${f(r.maxRelativeRadius)} | ${f(r.maxEnergy)} | ${f(r.maxLz)} |`).join("\n")}\n\nO passo fixo resolve o menor período linear (azimutal, radial ou vertical) em 1024 amostras. O seletor permite 2048 e 4096 sem mudar o campo. O domínio 0,5–50 kpc é uma escolha operacional de validação, não o tamanho físico ou truncamento do halo.\n\n## Traçador solar — cinco Gyr\n\n| Halo | máximo erro E | máximo erro Lz | R mínimo/máximo (kpc) | máximo |z| (kpc) |\n|---|---|---|---|---|\n${solar.map((s) => `| ${s.halo ? "Sim" : "Não"} | ${f(s.maxEnergy)} | ${f(s.maxLz)} | ${s.rmin.toFixed(3)} / ${s.rmax.toFixed(3)} | ${s.zmax.toFixed(4)} |`).join("\n")}\n\nO cenário sem halo recebe exatamente o estado inicial do cenário completo. A órbita não circular resultante não deve ser chamada automaticamente de instável. E e Lz são conservados em cada potencial separadamente; a energia inicial não precisa coincidir entre cenários.\n\n## Convergência\n\nEm 0,2 Gyr, usando 500, 1000 e 2000 passos, a razão ||q_h−q_h/2|| / ||q_h/2−q_h/4|| foi **${data.convergenceRatio.toFixed(5)}**, compatível com ordem dois (razão esperada 4). Conservação de energia sozinha não controla erro de fase. A suíte também compara a trajetória elíptica de Kepler com a solução da equação de Kepler, reversibilidade, período epicíclico, gradientes 3D e o vetor de momento angular em campo esférico.\n\n## Código original — medição sem correções\n\nA fixture é cópia arquivada da implementação original, usada somente em testes. Os estados e modelos originais diferem dos novos; esta tabela não isola a influência exclusiva de h.\n\n| Halo | h (Myr) | máximo erro E em 5 Gyr | máximo erro Lz |\n|---|---|---|---|\n${legacy.map((s) => `| ${s.halo ? "Sim" : "Não"} | 1 | ${f(s.maxEnergy)} | ${f(s.maxLz)} |`).join("\n")}\n\nA existência de pequenas oscilações de energia no original não implica divergência. O diagnóstico identifica ausência de garantias/testes e deficiências de implementação, sem afirmar que todas as órbitas antigas explodem.\n\n## Comparação observacional — não é teste de integração\n\n| R (kpc) | observado (km/s) | modelo (km/s) | diferença (km/s) |\n|---|---|---|---|\n${constraints.map((o) => `| ${o.R} | ${o.observed} | ${o.model.toFixed(3)} | ${o.difference.toFixed(3)} |`).join("\n")}\n\nFontes: [Eilers et al. (2019)](https://arxiv.org/abs/1810.09466), com erros estatísticos e sistemáticos distintos, e [Reid et al. (2019)](https://arxiv.org/abs/1910.03357). Os raios e métodos diferem. Não se calcula χ² a partir de erros estatísticos isolados nem se afirma um novo ajuste da Via Láctea.\n\n## Detecção automática\n\nA cada passo: estado finito, domínio operacional, erro normalizado de energia (limite 10⁻⁴), momento angular (10⁻⁸) e hω local (0,03). Máximos históricos são retidos. ω local inclui cruzamento radial, aceleração e curvatura vertical. O programa pausa se qualquer cenário exceder o limite. Esses limites são tolerâncias de engenharia; não valores astronômicos. A detecção não prova ausência de erro de fase, caos ou adequação observacional.\n\n## Limitações\n\nPotencial fixo, sem barra gravitacional, braços gravitacionais, gás, auto-gravidade do traçador, relaxação ou crescimento cosmológico. Dez períodos não provam estabilidade por tempo infinito. A distribuição decorativa não é catálogo, modelo fotométrico ou solução da equação de Boltzmann. O modelo Gala v1 é histórico; precisão numérica não implica que seja o melhor modelo atual da Galáxia.\n`,
);
console.log(JSON.stringify(data, null, 2));
