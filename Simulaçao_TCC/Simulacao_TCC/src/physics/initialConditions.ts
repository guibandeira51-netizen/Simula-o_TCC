import { NUMERICS, SOLAR } from "../data/parameters";
import { GalacticPotential } from "./potentials";
import type { State } from "./integrator";
import { kmSToInternalVelocity } from "./units";
import { localFrequency } from "./diagnostics";
import { cylindricalVelocity } from "./kinematics";
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
      v: [
        -kmSToInternalVelocity(SOLAR.U),
        kmSToInternalVelocity(vc + SOLAR.V),
        kmSToInternalVelocity(SOLAR.W),
      ],
      t: 0,
    };
  return {
    q: [R, 0, 0],
    v: [
      preset === "perturbed"
        ? kmSToInternalVelocity(NUMERICS.perturbationFraction * vc)
        : 0,
      kmSToInternalVelocity(vc),
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

/** Fixed step chosen once for both fields and the actual common initial velocity. */
export function chooseComparisonStep(fields: readonly GalacticPotential[], initial: State, refinement = 1): number {
  if (!(refinement > 0) || !Number.isFinite(refinement)) throw new RangeError("Resolução inválida");
  const R = Math.hypot(initial.q[0], initial.q[1]);
  const frequency = Math.max(...fields.map(field => {
    const f = field.frequencies(R);
    if (f.kappa2 < 0 || f.nu2 < 0) throw new RangeError("Frequências ao quadrado negativas");
    return Math.max(Math.sqrt(Math.max(f.omega2, f.kappa2, f.nu2)), localFrequency(initial, field));
  }));
  if (!(frequency > 0) || !Number.isFinite(frequency)) throw new RangeError("Escala temporal inválida");
  return 2 * Math.PI / (NUMERICS.samplesPerFastPeriod * frequency * refinement);
}

/** Analytical condition, not a radial-amplitude cutoff or a change to the orbit. */
export function isCircularPlanarInitial(initial: State, field: GalacticPotential): boolean {
  if (initial.q[2] !== 0 || initial.v[2] !== 0) return false;
  const k = cylindricalVelocity(initial.q, initial.v);
  if (!(k.R > 0)) return false;
  const vc = field.circularSpeed(k.R);
  const roundoff = 64 * Number.EPSILON * Math.max(1, vc);
  return Math.abs(k.vR) <= roundoff && Math.abs(Math.abs(k.vPhi) - vc) <= roundoff;
}
