/** Dimensional inputs and provenance. Model parameters form one named fit. */
export const REFERENCES = {
  gala: {
    title: "Gala MilkyWayPotential v1 — parâmetros",
    url: "https://gala.adrian.pw/en/stable/_modules/gala/potential/potential/builtin/special.html",
  },
  fit: {
    title: "Gala — construção e limitações dos modelos v1/v2",
    url: "https://gala.adrian.pw/en/stable/supporting/define-milky-way-model.html",
  },
  bovy: { title: "Bovy (2015), galpy", url: "https://arxiv.org/abs/1412.3451" },
  hernquist: {
    title: "Hernquist (1990)",
    url: "https://articles.adsabs.harvard.edu/pdf/1990ApJ...356..359H",
  },
  mn: {
    title: "Miyamoto & Nagai (1975)",
    url: "https://articles.adsabs.harvard.edu/pdf/1975PASJ...27..533M",
  },
  nfw: {
    title: "Navarro, Frenk & White (1997)",
    url: "https://arxiv.org/abs/astro-ph/9611107",
  },
  iau: {
    title: "IAU 2015 B3 — GM solar nominal",
    url: "https://arxiv.org/abs/1510.07674",
  },
  units: {
    title: "NASA/JPL — unidades astronômicas",
    url: "https://ssd.jpl.nasa.gov/astro_par.html",
  },
  gravity: {
    title: "GRAVITY (2019), distância ao centro",
    url: "https://arxiv.org/abs/1904.05721",
  },
  height: {
    title: "Bennett & Bovy (2019), altura solar",
    url: "https://arxiv.org/abs/1809.03507",
  },
  solar: {
    title: "Schönrich, Binney & Dehnen (2010)",
    url: "https://academic.oup.com/mnras/article/403/4/1829/1054839",
  },
  eilers: {
    title: "Eilers et al. (2019), curva de rotação",
    url: "https://arxiv.org/abs/1810.09466",
  },
  reid: {
    title: "Reid et al. (2019), estrutura e cinemática",
    url: "https://arxiv.org/abs/1910.03357",
  },
  leapfrog: {
    title: "Springel (2005), §4.1 — leapfrog",
    url: "https://wwwmpa.mpa-garching.mpg.de/gadget/gadget2-paper.pdf",
  },
} as const;
export const AU_METERS = 149597870700;
export const KPC_METERS = 1000 * (648000 / Math.PI) * AU_METERS;
export const GYR_SECONDS = 1e9 * 365.25 * 86400;
export const GM_SUN_NOMINAL = 1.3271244e20;
/** kpc (km/s)^2 / nominal M_sun. Avoid separately rounded G and M_sun. */
export const G = GM_SUN_NOMINAL / KPC_METERS / 1e6;
export const VELOCITY = (1000 * GYR_SECONDS) / KPC_METERS;
export const ACCELERATION = VELOCITY ** 2;
export const MODEL = Object.freeze({
  name: "Gala MilkyWayPotential v1 (referência histórica)",
  disk: Object.freeze({ mass: 6.8e10, a: 3, b: 0.28 }),
  bulge: Object.freeze({ mass: 5e9, a: 1 }),
  nucleus: Object.freeze({ mass: 1.71e9, a: 0.07 }),
  halo: Object.freeze({ scaleMass: 5.4e11, rs: 15.62 }),
});
export const SOLAR = Object.freeze({
  R: 8.178,
  z: 0.0208,
  U: 11.1,
  V: 12.24,
  W: 7.25,
});
export const PARAMETER_ROWS: [
  string,
  string,
  number,
  string,
  keyof typeof REFERENCES,
][] = [
  ["Disco: massa", "M_d", MODEL.disk.mass, "M☉", "gala"],
  ["Disco: escala radial MN", "a_d", MODEL.disk.a, "kpc", "gala"],
  ["Disco: escala vertical MN", "b_d", MODEL.disk.b, "kpc", "gala"],
  ["Bojo: massa", "M_b", MODEL.bulge.mass, "M☉", "gala"],
  ["Bojo: escala", "a_b", MODEL.bulge.a, "kpc", "gala"],
  ["Núcleo: massa estelar", "M_n", MODEL.nucleus.mass, "M☉", "gala"],
  ["Núcleo: escala", "a_n", MODEL.nucleus.a, "kpc", "gala"],
  [
    "Halo: massa de escala (não virial)",
    "A",
    MODEL.halo.scaleMass,
    "M☉",
    "gala",
  ],
  ["Halo: raio de escala", "r_s", MODEL.halo.rs, "kpc", "gala"],
  [
    "Halo: densidade derivada",
    "ρ_s",
    MODEL.halo.scaleMass / (4 * Math.PI * MODEL.halo.rs ** 3),
    "M☉/kpc³",
    "gala",
  ],
  ["Distância solar", "R_☉", SOLAR.R, "kpc", "gravity"],
  ["Altura solar", "z_☉", SOLAR.z, "kpc", "height"],
  ["Movimento solar para o centro", "U", SOLAR.U, "km/s", "solar"],
  ["Movimento solar na rotação", "V", SOLAR.V, "km/s", "solar"],
  ["Movimento solar vertical", "W", SOLAR.W, "km/s", "solar"],
  ["Constante em unidades nominais", "G", G, "kpc (km/s)²/M☉", "iau"],
  ["Conversão de velocidade", "C", VELOCITY, "(kpc/Gyr)/(km/s)", "units"],
];
/** Numerical choices, NOT measured physical constants. */
export const NUMERICS = Object.freeze({
  samplesPerFastPeriod: 1024,
  derivativeFraction: 1e-4,
  nfwSeriesBoundary: 1e-3, // series through u^8; relative truncation O(u^7)
  energyTolerance: 1e-4,
  angularTolerance: 1e-8,
  maxStepFrequency: 0.03,
  minRadius: 0.5,
  maxRadius: 50,
  boundaryRelativeTolerance: 1e-4, // operational domain, not halo truncation
  perturbationFraction: 0.01, // controlled small perturbation in linear regime
});
