/** All values here are display choices, NOT a stellar catalogue or mass model. */
export const VISUAL = Object.freeze({
  seed: 773,
  starCount: 100000,
  dustCount: 9000,
  bulgeFraction: 0.18,
  haloFraction: 0.035,
  armFraction: 0.36,
  diskScale: 3.5,
  diskEdge: 26,
  thinHeight: 0.16,
  thickHeight: 0.6,
  bulgeScale: 0.75,
  bulgeEdge: 4,
  bulgeFlattening: 0.7,
  haloEdge: 32,
  pitchDegrees: 18,
  arms: 4,
  armStart: 2.4,
  armWidth: 0.48,
  armHeight: 0.08,
  starExposure: 1.45,
  maxPixelRatio: 1.5,
  trailSegments: 4096,
});
export function randomGenerator(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
