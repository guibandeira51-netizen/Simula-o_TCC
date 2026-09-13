import { REFERENCES } from "./parameters";
/** Independent summary constraints, not digitized samples or calibration targets. */
export const OBSERVATIONS = [
  {
    R: 8.122,
    vc: 229.0,
    stat: 0.2,
    source: REFERENCES.eilers,
    note: "Eilers: erro estatístico; sistemáticos estimados de 2–5% não incluídos.",
  },
  {
    R: 8.15,
    radiusError: 0.15,
    vc: 236,
    stat: 7,
    source: REFERENCES.reid,
    note: "Reid: masers; parâmetros ajustados conjuntamente.",
  },
];
