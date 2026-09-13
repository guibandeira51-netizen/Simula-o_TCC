import { NUMERICS, VELOCITY } from "../data/parameters";
import type { Field } from "./potentials";
import type { State } from "./integrator";
export function invariants(s: State, field: Field) {
  const K = s.v.reduce((sum, v) => sum + v * v, 0) / (2 * VELOCITY ** 2),
    phi = field.potential(s.q);
  return {
    K,
    phi,
    E: K + phi,
    Lz: (s.q[0] * s.v[1] - s.q[1] * s.v[0]) / VELOCITY,
  };
}
export class Monitor {
  baseline: ReturnType<typeof invariants>;
  energyScale: number;
  angularScale: number;
  maxEnergy = 0;
  maxAngular = 0;
  constructor(s: State, field: Field) {
    this.baseline = invariants(s, field);
    this.energyScale = Math.max(
      Math.abs(this.baseline.E),
      this.baseline.K,
      Number.MIN_VALUE,
    );
    this.angularScale = Math.max(
      Math.abs(this.baseline.Lz),
      (Math.hypot(...s.q) * Math.hypot(...s.v)) / VELOCITY,
      Number.MIN_VALUE,
    );
  }
  measure(s: State, field: Field, h: number) {
    const inv = invariants(s, field),
      r = Math.hypot(...s.q),
      a = field.acceleration(s.q);
    const energyError = Math.abs(inv.E - this.baseline.E) / this.energyScale;
    const angularError =
      Math.abs(inv.Lz - this.baseline.Lz) / this.angularScale;
    this.maxEnergy = Math.max(this.maxEnergy, energyError);
    this.maxAngular = Math.max(this.maxAngular, angularError);
    const dz = Math.max(r, NUMERICS.minRadius) * NUMERICS.derivativeFraction;
    const ap = field.acceleration([s.q[0], s.q[1], s.q[2] + dz]);
    const am = field.acceleration([s.q[0], s.q[1], s.q[2] - dz]);
    const frequency = Math.max(
      Math.hypot(...s.v) / r,
      Math.sqrt(Math.hypot(...a) / r),
      Math.sqrt(Math.abs((ap[2] - am[2]) / (2 * dz))),
    );
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
