import type { Field, Vec3 } from "./potentials";
export interface State {
  q: Vec3;
  v: Vec3;
  t: number;
}
export function copyState(s: State): State {
  return { q: [...s.q], v: [...s.v], t: s.t };
}
/** Fixed-step KDK. Negative h supported for reversibility tests. */
export function leapfrog(s: State, h: number, field: Field): void {
  if (!Number.isFinite(h)) throw new RangeError("Passo não finito");
  const a0 = field.acceleration(s.q);
  const v = s.v.map((v, i) => v + (h * a0[i]) / 2) as Vec3;
  const q = s.q.map((q, i) => q + h * v[i]) as Vec3;
  const a1 = field.acceleration(q);
  for (let i = 0; i < 3; i++) v[i] += (h * a1[i]) / 2;
  if (![...q, ...v, s.t + h].every(Number.isFinite))
    throw new RangeError("Estado não finito");
  s.q = q;
  s.v = v;
  s.t += h;
}
