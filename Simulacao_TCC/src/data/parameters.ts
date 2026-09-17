/** Dimensional inputs and provenance. Three-component model; retained parameters have independent provenance. */
export const REFERENCES = {
  gala: {
    title: "Gala MilkyWayPotential v1 — parâmetros",
    url: "https://gala.adrian.pw/en/stable/_modules/gala/potential/potential/builtin/special.html",
    doi: "10.21105/joss.00388",
  },
  fit: {
    title: "Gala — construção e limitações dos modelos v1/v2",
    url: "https://gala.adrian.pw/en/stable/supporting/define-milky-way-model.html",
  },
  bovy: { title: "Bovy (2015), galpy", url: "https://arxiv.org/abs/1412.3451" },
  hernquist: {
    title: "Hernquist (1990)",
    url: "https://articles.adsabs.harvard.edu/pdf/1990ApJ...356..359H",
    doi: "10.1086/168845",
  },
  mn: {
    title: "Miyamoto & Nagai (1975)",
    url: "https://articles.adsabs.harvard.edu/pdf/1975PASJ...27..533M",
    doi: "10.1093/pasj/27.4.533",
  },
  nfw: {
    title: "Navarro, Frenk & White (1997)",
    url: "https://arxiv.org/abs/astro-ph/9611107",
    doi: "10.1086/304888",
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
export interface PhysicalParameter {
  value: number;
  unit: string;
  symbol: string;
  description: string;
  source: keyof typeof REFERENCES;
}
/** Single provenance registry for dimensional parameters used by the model. */
export const PHYSICAL_PARAMETERS: Readonly<Record<string, PhysicalParameter>> = {
  diskMass: { value: 6.8e10, unit: "M☉", symbol: "M_d", description: "Massa do disco Miyamoto–Nagai", source: "gala" },
  diskScaleLength: { value: 3, unit: "kpc", symbol: "a_d", description: "Escala radial do disco Miyamoto–Nagai", source: "gala" },
  diskScaleHeight: { value: 0.28, unit: "kpc", symbol: "b_d", description: "Escala vertical do disco Miyamoto–Nagai", source: "gala" },
  bulgeMass: { value: 5e9, unit: "M☉", symbol: "M_b", description: "Massa do bojo Hernquist", source: "gala" },
  bulgeScaleRadius: { value: 1, unit: "kpc", symbol: "a_b", description: "Escala do bojo Hernquist", source: "gala" },
  haloScaleMass: { value: 5.4e11, unit: "M☉", symbol: "A", description: "Massa de escala A=4πρ_s r_s³ do halo NFW", source: "gala" },
  haloScaleRadius: { value: 15.62, unit: "kpc", symbol: "r_s", description: "Raio de escala do halo NFW", source: "gala" },
  solarRadius: { value: 8.178, unit: "kpc", symbol: "R_☉", description: "Distância galactocêntrica solar", source: "gravity" },
  solarHeight: { value: 0.0208, unit: "kpc", symbol: "z_☉", description: "Altura solar acima do plano", source: "height" },
  solarU: { value: 11.1, unit: "km/s", symbol: "U_☉", description: "Movimento peculiar solar para o centro", source: "solar" },
  solarV: { value: 12.24, unit: "km/s", symbol: "V_☉", description: "Movimento peculiar solar na rotação", source: "solar" },
  solarW: { value: 7.25, unit: "km/s", symbol: "W_☉", description: "Movimento peculiar solar vertical", source: "solar" },
  gravitationalConstant: { value: G, unit: "kpc (km/s)²/M☉", symbol: "G", description: "Constante gravitacional derivada de GM☉ nominal", source: "iau" },
  velocityConversion: { value: VELOCITY, unit: "(kpc/Gyr)/(km/s)", symbol: "C", description: "Conversão de km/s para kpc/Gyr", source: "units" },
};
export const MODEL = Object.freeze({
  name: "Modelo TCC — bojo Hernquist + disco Miyamoto–Nagai + halo NFW",
  disk: Object.freeze({
    mass: PHYSICAL_PARAMETERS.diskMass.value,
    a: PHYSICAL_PARAMETERS.diskScaleLength.value,
    b: PHYSICAL_PARAMETERS.diskScaleHeight.value,
  }),
  bulge: Object.freeze({
    mass: PHYSICAL_PARAMETERS.bulgeMass.value,
    a: PHYSICAL_PARAMETERS.bulgeScaleRadius.value,
  }),
  halo: Object.freeze({
    scaleMass: PHYSICAL_PARAMETERS.haloScaleMass.value,
    rs: PHYSICAL_PARAMETERS.haloScaleRadius.value,
  }),
});
export const SOLAR = Object.freeze({
  R: PHYSICAL_PARAMETERS.solarRadius.value,
  z: PHYSICAL_PARAMETERS.solarHeight.value,
  U: PHYSICAL_PARAMETERS.solarU.value,
  V: PHYSICAL_PARAMETERS.solarV.value,
  W: PHYSICAL_PARAMETERS.solarW.value,
});
export const PARAMETER_ROWS: [
  string,
  string,
  number,
  string,
  keyof typeof REFERENCES,
][] = [
  ["Disco: massa", PHYSICAL_PARAMETERS.diskMass.symbol, PHYSICAL_PARAMETERS.diskMass.value, PHYSICAL_PARAMETERS.diskMass.unit, PHYSICAL_PARAMETERS.diskMass.source],
  ["Disco: escala radial MN", PHYSICAL_PARAMETERS.diskScaleLength.symbol, PHYSICAL_PARAMETERS.diskScaleLength.value, PHYSICAL_PARAMETERS.diskScaleLength.unit, PHYSICAL_PARAMETERS.diskScaleLength.source],
  ["Disco: escala vertical MN", PHYSICAL_PARAMETERS.diskScaleHeight.symbol, PHYSICAL_PARAMETERS.diskScaleHeight.value, PHYSICAL_PARAMETERS.diskScaleHeight.unit, PHYSICAL_PARAMETERS.diskScaleHeight.source],
  ["Bojo: massa", PHYSICAL_PARAMETERS.bulgeMass.symbol, PHYSICAL_PARAMETERS.bulgeMass.value, PHYSICAL_PARAMETERS.bulgeMass.unit, PHYSICAL_PARAMETERS.bulgeMass.source],
  ["Bojo: escala", PHYSICAL_PARAMETERS.bulgeScaleRadius.symbol, PHYSICAL_PARAMETERS.bulgeScaleRadius.value, PHYSICAL_PARAMETERS.bulgeScaleRadius.unit, PHYSICAL_PARAMETERS.bulgeScaleRadius.source],
  [
    "Halo: massa de escala (não virial)",
    PHYSICAL_PARAMETERS.haloScaleMass.symbol,
    PHYSICAL_PARAMETERS.haloScaleMass.value,
    PHYSICAL_PARAMETERS.haloScaleMass.unit,
    PHYSICAL_PARAMETERS.haloScaleMass.source,
  ],
  ["Halo: raio de escala", PHYSICAL_PARAMETERS.haloScaleRadius.symbol, PHYSICAL_PARAMETERS.haloScaleRadius.value, PHYSICAL_PARAMETERS.haloScaleRadius.unit, PHYSICAL_PARAMETERS.haloScaleRadius.source],
  [
    "Halo: densidade derivada",
    "ρ_s",
    MODEL.halo.scaleMass / (4 * Math.PI * MODEL.halo.rs ** 3),
    "M☉/kpc³",
    "gala",
  ],
  ["Distância solar", PHYSICAL_PARAMETERS.solarRadius.symbol, PHYSICAL_PARAMETERS.solarRadius.value, PHYSICAL_PARAMETERS.solarRadius.unit, PHYSICAL_PARAMETERS.solarRadius.source],
  ["Altura solar", PHYSICAL_PARAMETERS.solarHeight.symbol, PHYSICAL_PARAMETERS.solarHeight.value, PHYSICAL_PARAMETERS.solarHeight.unit, PHYSICAL_PARAMETERS.solarHeight.source],
  ["Movimento solar para o centro", PHYSICAL_PARAMETERS.solarU.symbol, PHYSICAL_PARAMETERS.solarU.value, PHYSICAL_PARAMETERS.solarU.unit, PHYSICAL_PARAMETERS.solarU.source],
  ["Movimento solar na rotação", PHYSICAL_PARAMETERS.solarV.symbol, PHYSICAL_PARAMETERS.solarV.value, PHYSICAL_PARAMETERS.solarV.unit, PHYSICAL_PARAMETERS.solarV.source],
  ["Movimento solar vertical", PHYSICAL_PARAMETERS.solarW.symbol, PHYSICAL_PARAMETERS.solarW.value, PHYSICAL_PARAMETERS.solarW.unit, PHYSICAL_PARAMETERS.solarW.source],
  ["Constante em unidades nominais", PHYSICAL_PARAMETERS.gravitationalConstant.symbol, PHYSICAL_PARAMETERS.gravitationalConstant.value, PHYSICAL_PARAMETERS.gravitationalConstant.unit, PHYSICAL_PARAMETERS.gravitationalConstant.source],
  ["Conversão de velocidade", PHYSICAL_PARAMETERS.velocityConversion.symbol, PHYSICAL_PARAMETERS.velocityConversion.value, PHYSICAL_PARAMETERS.velocityConversion.unit, PHYSICAL_PARAMETERS.velocityConversion.source],
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
