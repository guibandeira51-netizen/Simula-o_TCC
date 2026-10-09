import { cylindricalVelocity, speedKmS } from "../physics/kinematics";
import type { State } from "../physics/integrator";

export interface TrajectoryPoint {
  t: number;
  R: number;
  speed: number;
  vR: number;
  phi: number;
}

export interface TrajectorySummary {
  rMin: number;
  rMax: number;
  pericenter: number | null;
  apocenter: number | null;
  eccentricity: number;
  meanSpeed: number;
  radialPeriod: number | null;
  azimuthalPeriod: number | null;
  phaseAdvance: number;
  radialMotion: "circular-planar" | "measured" | "not-yet-measured";
}

const mean = (values: number[]): number | null =>
  values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;

function unwrap(previous: number, current: number): number {
  let delta = current - previous;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;
  return previous + delta;
}

export class TrajectoryRecorder {
  constructor(readonly circularPlanar = false) {}
  readonly points: TrajectoryPoint[] = [];
  private count = 0;
  private speedSum = 0;
  private rMin = Number.POSITIVE_INFINITY;
  private rMax = Number.NEGATIVE_INFINITY;
  private previous?: TrajectoryPoint;
  private pericenters: number[] = [];
  private apocenters: number[] = [];
  private radialPeriods: number[] = [];
  private azimuthalPeriods: number[] = [];
  private lastAzimuthCrossing?: number;
  private unwrappedPhi = 0;
  private initialPhi = 0;

  record(state: State, retain = true): TrajectoryPoint {
    const kin = cylindricalVelocity(state.q, state.v);
    const rawPhi = Math.atan2(state.q[1], state.q[0]);
    if (!this.previous) {
      this.initialPhi = rawPhi;
      this.unwrappedPhi = rawPhi;
      this.lastAzimuthCrossing = state.t;
    } else {
      this.unwrappedPhi = unwrap(this.unwrappedPhi, rawPhi);
      const old = this.previous;
      if (!this.circularPlanar && old.vR < 0 && kin.vR >= 0) {
        const crossingTime = old.t + (state.t - old.t) * (-old.vR / (kin.vR - old.vR));
        this.pericenters.push(kin.R);
        if (this.pericenters.length > 1) {
          this.radialPeriods.push(crossingTime - this.lastPericenterTime);
        }
        this.lastPericenterTime = crossingTime;
      }
      if (!this.circularPlanar && old.vR > 0 && kin.vR <= 0) this.apocenters.push(kin.R);
      const turns = Math.floor(Math.abs(this.unwrappedPhi - this.initialPhi) / (2 * Math.PI));
      if (turns > this.azimuthTurns) {
        const sign = Math.sign(this.unwrappedPhi - this.initialPhi);
        const crossingPhi = this.initialPhi + sign * turns * 2 * Math.PI;
        const time = old.t + (state.t - old.t) * (crossingPhi - old.phi) / (this.unwrappedPhi - old.phi);
        if (this.lastAzimuthCrossing !== undefined)
          this.azimuthalPeriods.push(time - this.lastAzimuthCrossing);
        this.lastAzimuthCrossing = time;
        this.azimuthTurns = turns;
      }
    }
    const point: TrajectoryPoint = {
      t: state.t,
      R: kin.R,
      speed: speedKmS(state.v),
      vR: kin.vR,
      phi: this.unwrappedPhi,
    };
    this.count++;
    this.speedSum += point.speed;
    this.rMin = Math.min(this.rMin, point.R);
    this.rMax = Math.max(this.rMax, point.R);
    if (retain) {
      this.points.push(point);
      if (this.points.length > 12000) this.points.shift();
    }
    this.previous = point;
    return point;
  }

  private lastPericenterTime = 0;
  private azimuthTurns = 0;

  reset() {
    this.points.length = 0;
    this.count = 0;
    this.speedSum = 0;
    this.rMin = Number.POSITIVE_INFINITY;
    this.rMax = Number.NEGATIVE_INFINITY;
    this.previous = undefined;
    this.pericenters = [];
    this.apocenters = [];
    this.radialPeriods = [];
    this.azimuthalPeriods = [];
    this.lastAzimuthCrossing = undefined;
    this.unwrappedPhi = 0;
    this.initialPhi = 0;
    this.lastPericenterTime = 0;
    this.azimuthTurns = 0;
  }

  summary(bound = true): TrajectorySummary {
    const rMin = Number.isFinite(this.rMin) ? this.rMin : 0;
    const rMax = Number.isFinite(this.rMax) ? this.rMax : 0;
    return {
      rMin,
      rMax,
      pericenter: this.pericenters.length ? Math.min(...this.pericenters) : null,
      apocenter: bound && this.apocenters.length ? Math.max(...this.apocenters) : null,
      eccentricity: rMax + rMin > 0 ? (rMax - rMin) / (rMax + rMin) : 0,
      meanSpeed: this.count ? this.speedSum / this.count : 0,
      radialPeriod: bound ? mean(this.radialPeriods) : null,
      azimuthalPeriod: bound ? mean(this.azimuthalPeriods) : null,
      phaseAdvance: this.unwrappedPhi - this.initialPhi,
      radialMotion: this.circularPlanar ? "circular-planar" : this.pericenters.length || this.apocenters.length ? "measured" : "not-yet-measured",
    };
  }
}

export function spatialSeparation(a: State, b: State): number {
  return Math.hypot(
    a.q[0] - b.q[0],
    a.q[1] - b.q[1],
    a.q[2] - b.q[2],
  );
}
