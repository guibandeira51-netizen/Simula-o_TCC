import { NUMERICS, SOLAR, VELOCITY } from "../data/parameters";
import { GalacticPotential } from "./potentials";
import type { State } from "./integrator";
export type Preset = "solar" | "circular" | "perturbed";
export function initialConditions(
  field: GalacticPotential,
  preset: Preset,
  radius: number = SOLAR.R,
): State {
  const R = preset === "solar" ? SOLAR.R : radius;
  if (!Number.isFinite(R) || R < NUMERICS.minRadius || R > NUMERICS.maxRadius)
    throw new RangeError("Raio inicial fora de 0,5–50 kpc");
  const vc = field.circularSpeed(R);
  if (preset === "solar")
    return {
      q: [R, 0, SOLAR.z],
      v: [-SOLAR.U * VELOCITY, (vc + SOLAR.V) * VELOCITY, SOLAR.W * VELOCITY],
      t: 0,
    };
  return {
    q: [R, 0, 0],
    v: [
      preset === "perturbed"
        ? NUMERICS.perturbationFraction * vc * VELOCITY
        : 0,
      vc * VELOCITY,
      0,
    ],
    t: 0,
  };
}
export function chooseStep(field: GalacticPotential, R: number): number {
  const { omega2, kappa2, nu2 } = field.frequencies(R);
  if (kappa2 < 0 || nu2 < 0)
    throw new RangeError("Frequências ao quadrado negativas");
  const frequency = Math.sqrt(Math.max(omega2, kappa2, nu2));
  if (!(frequency > 0))
    throw new RangeError("Selecione ao menos uma componente");
  return (2 * Math.PI) / (NUMERICS.samplesPerFastPeriod * frequency);
}
