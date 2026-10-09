import { ACCELERATION, VELOCITY } from "../data/parameters";
import type { Vec3 } from "./potentials";

/** Unit boundary between the integrator and the user-facing diagnostics. */
export const internalVelocityToKmS = (value: number): number => value / VELOCITY;
export const kmSToInternalVelocity = (value: number): number => value * VELOCITY;
export const internalAccelerationToKmS2PerKpc = (value: number): number =>
  value / ACCELERATION;
export const kmS2PerKpcToInternalAcceleration = (value: number): number =>
  value * ACCELERATION;
export const vectorInternalVelocityToKmS = (value: Vec3): Vec3 =>
  value.map(internalVelocityToKmS) as Vec3;
export const vectorInternalAccelerationToKmS2PerKpc = (value: Vec3): Vec3 =>
  value.map(internalAccelerationToKmS2PerKpc) as Vec3;

export const VELOCITY_UNIT = "km/s";
export const ACCELERATION_UNIT = "(km/s)²/kpc";
