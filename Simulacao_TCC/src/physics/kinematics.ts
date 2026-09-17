import type { Vec3 } from "./potentials";
import { internalVelocityToKmS } from "./units";

export interface CylindricalVelocity {
  R: number;
  vR: number;
  vPhi: number;
  vz: number;
}

/** UI-facing cylindrical velocity in km/s. At R=0, azimuth is undefined; return 0. */
export function cylindricalVelocity(q: Vec3, v: Vec3): CylindricalVelocity {
  const R = Math.hypot(q[0], q[1]);
  if (R <= Number.EPSILON)
    return { R, vR: 0, vPhi: 0, vz: internalVelocityToKmS(v[2]) };
  return {
    R,
    vR: internalVelocityToKmS((q[0] * v[0] + q[1] * v[1]) / R),
    vPhi: internalVelocityToKmS((q[0] * v[1] - q[1] * v[0]) / R),
    vz: internalVelocityToKmS(v[2]),
  };
}

export function speedKmS(v: Vec3): number {
  return internalVelocityToKmS(Math.hypot(...v));
}
