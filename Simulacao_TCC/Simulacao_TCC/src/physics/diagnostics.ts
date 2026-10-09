import { NUMERICS } from "../data/parameters";
import type { Field } from "./potentials";
import type { State } from "./integrator";
import { internalVelocityToKmS } from "./units";
export function invariants(s: State, field: Field) {
  const K = s.v.reduce((sum, v) => sum + internalVelocityToKmS(v) ** 2, 0) / 2,
    phi = field.potential(s.q);
  return {
    K,
    phi,
    E: K + phi,
    Lz:
      s.q[0] * internalVelocityToKmS(s.v[1]) -
      s.q[1] * internalVelocityToKmS(s.v[0]),
  };
}
/** Local rate in Gyr^-1; used both to select h and to monitor its resolution. */
export function localFrequency(s: State, field: Field): number {
  const r = Math.hypot(...s.q);
  if (!(r > 0)) throw new RangeError("Escala temporal indefinida na origem");
  const a = field.acceleration(s.q);
  const dz = Math.max(r, NUMERICS.minRadius) * NUMERICS.derivativeFraction;
  const ap = field.acceleration([s.q[0], s.q[1], s.q[2] + dz]);
  const am = field.acceleration([s.q[0], s.q[1], s.q[2] - dz]);
  return Math.max(Math.hypot(...s.v) / r, Math.sqrt(Math.hypot(...a) / r),
    Math.sqrt(Math.abs((ap[2] - am[2]) / (2 * dz))));
}
export class Monitor {
  baseline: ReturnType<typeof invariants>;
  energyScale: number;
  angularScale: number;
  maxEnergy = 0;
  maxAngular = 0;
  maxRelativeEnergy: number | null = null;
  maxRelativeAngular: number | null = null;
  constructor(s: State, field: Field) {
    this.baseline = invariants(s, field);
    this.energyScale = Math.max(
      Math.abs(this.baseline.E),
      this.baseline.K,
      Number.MIN_VALUE,
    );
    this.angularScale = Math.max(
      Math.abs(this.baseline.Lz),
      Math.hypot(...s.q) * internalVelocityToKmS(Math.hypot(...s.v)),
      Number.MIN_VALUE,
    );
  }
  measure(s: State, field: Field, h: number) {
    const inv = invariants(s, field),
      r = Math.hypot(...s.q);
    const energyError = Math.abs(inv.E - this.baseline.E) / this.energyScale;
    // Signed ratios requested for diagnostics; undefined when the baseline is zero.
    const relativeEnergy = this.baseline.E === 0 ? null : (inv.E - this.baseline.E) / this.baseline.E;
    const relativeAngular = this.baseline.Lz === 0 ? null : (inv.Lz - this.baseline.Lz) / this.baseline.Lz;
    if (relativeEnergy !== null) this.maxRelativeEnergy = Math.max(this.maxRelativeEnergy ?? 0, Math.abs(relativeEnergy));
    if (relativeAngular !== null) this.maxRelativeAngular = Math.max(this.maxRelativeAngular ?? 0, Math.abs(relativeAngular));
    const angularError =
      Math.abs(inv.Lz - this.baseline.Lz) / this.angularScale;
    this.maxEnergy = Math.max(this.maxEnergy, energyError);
    this.maxAngular = Math.max(this.maxAngular, angularError);
    const frequency = localFrequency(s, field);
    // Relative ratios remain informative, but are singular near E0=0 or Lz0=0.
    // Only the validated robust scales control the integration alarm.
    const energyReferenceConditioned = Math.abs(this.baseline.E) > NUMERICS.energyTolerance * this.energyScale;
    const angularReferenceConditioned = Math.abs(this.baseline.Lz) > NUMERICS.angularTolerance * this.angularScale;
    const resolution = h * frequency,
      domainError =
        r < NUMERICS.minRadius * (1 - NUMERICS.boundaryRelativeTolerance) ||
        r > NUMERICS.maxRadius * (1 + NUMERICS.boundaryRelativeTolerance);
    const finite = [inv.E, inv.Lz, energyError, angularError, resolution].every(
      Number.isFinite,
    );
    const warning =
      !finite ||
      domainError ||
      this.maxEnergy > NUMERICS.energyTolerance ||
      this.maxAngular > NUMERICS.angularTolerance ||
      resolution > NUMERICS.maxStepFrequency;
    return {
      ...inv,
      energyReferenceConditioned,
      angularReferenceConditioned,
      relativeEnergy,
      relativeAngular,
      maxRelativeEnergy: this.maxRelativeEnergy,
      maxRelativeAngular: this.maxRelativeAngular,
      energyError,
      angularError,
      maxEnergy: this.maxEnergy,
      maxAngular: this.maxAngular,
      resolution,
      domainError,
      warning,
    };
  }
}
