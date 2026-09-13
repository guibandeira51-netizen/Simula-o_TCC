import { G, MODEL, NUMERICS, VELOCITY, ACCELERATION } from "../data/parameters";
export type Vec3 = [number, number, number];
export type Components = {
  halo: boolean;
  disk: boolean;
  bulge: boolean;
  nucleus: boolean;
};
export const ALL: Components = {
  halo: true,
  disk: true,
  bulge: true,
  nucleus: true,
};
export interface Field {
  potential(q: Vec3): number;
  acceleration(q: Vec3): Vec3;
}
export function nfwF(u: number): number {
  if (u < 0 || !Number.isFinite(u)) throw new RangeError("Raio NFW inválido");
  if (u < NUMERICS.nfwSeriesBoundary)
    return (
      u *
      u *
      (1 / 2 +
        u *
          (-2 / 3 +
            u *
              (3 / 4 +
                u * (-4 / 5 + u * (5 / 6 + u * (-6 / 7 + (u * 7) / 8))))))
    );
  return Math.log1p(u) - u / (1 + u);
}
export function haloMass(r: number): number {
  return MODEL.halo.scaleMass * nfwF(r / MODEL.halo.rs);
}
export function haloPotential(r: number): number {
  if (r < 0 || !Number.isFinite(r)) throw new RangeError("Raio NFW inválido");
  return (
    -G *
    MODEL.halo.scaleMass *
    (r === 0 ? 1 / MODEL.halo.rs : Math.log1p(r / MODEL.halo.rs) / r)
  );
}
/** Potentials: (km/s)^2. Accelerations: kpc/Gyr^2. */
export class GalacticPotential implements Field {
  readonly components: Readonly<Components>;
  constructor(components: Components = ALL) {
    this.components = Object.freeze({ ...components });
  }
  potential(q: Vec3): number {
    const [x, y, z] = q,
      r = Math.hypot(x, y, z),
      c = this.components;
    let phi = 0;
    if (c.halo) phi += haloPotential(r);
    if (c.bulge) phi -= (G * MODEL.bulge.mass) / (r + MODEL.bulge.a);
    if (c.nucleus) phi -= (G * MODEL.nucleus.mass) / (r + MODEL.nucleus.a);
    if (c.disk)
      phi -=
        (G * MODEL.disk.mass) /
        Math.hypot(x, y, MODEL.disk.a + Math.hypot(z, MODEL.disk.b));
    return phi;
  }
  acceleration(q: Vec3): Vec3 {
    const [x, y, z] = q,
      r = Math.hypot(x, y, z),
      c = this.components;
    if (!Number.isFinite(r)) throw new RangeError("Posição não finita");
    if (r === 0 && (c.halo || c.bulge || c.nucleus))
      throw new RangeError("Força cuspada indefinida no centro");
    let f = 0;
    if (c.halo) f -= (G * haloMass(r)) / (r * r * r);
    if (c.bulge) f -= (G * MODEL.bulge.mass) / (r * (r + MODEL.bulge.a) ** 2);
    if (c.nucleus)
      f -= (G * MODEL.nucleus.mass) / (r * (r + MODEL.nucleus.a) ** 2);
    const a: Vec3 = [f * x, f * y, f * z];
    if (c.disk) {
      const dz = Math.hypot(z, MODEL.disk.b),
        B = MODEL.disk.a + dz;
      const fd = (-G * MODEL.disk.mass) / Math.hypot(x, y, B) ** 3;
      a[0] += fd * x;
      a[1] += fd * y;
      a[2] += (fd * B * z) / dz;
    }
    return a.map((v) => v * ACCELERATION) as Vec3;
  }
  circularSpeed(R: number): number {
    if (!(R > 0)) throw new RangeError("R deve ser positivo");
    return Math.sqrt(
      Math.max(0, (-R * this.acceleration([R, 0, 0])[0]) / ACCELERATION),
    );
  }
  frequencies(R: number) {
    const h = R * NUMERICS.derivativeFraction;
    const omega2 = ((this.circularSpeed(R) * VELOCITY) / R) ** 2;
    const derivative =
      (((this.circularSpeed(R + h) * VELOCITY) / (R + h)) ** 2 -
        ((this.circularSpeed(R - h) * VELOCITY) / (R - h)) ** 2) /
      (2 * h);
    return {
      omega2,
      kappa2: R * derivative + 4 * omega2,
      nu2: -this.acceleration([R, 0, h])[2] / h,
    };
  }
}
