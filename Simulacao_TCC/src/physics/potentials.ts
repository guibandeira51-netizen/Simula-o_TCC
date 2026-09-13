import { G, MODEL, NUMERICS, VELOCITY, ACCELERATION } from "../data/parameters";
export type Vec3 = [number, number, number];
export type Components = {
  halo: boolean;
  disk: boolean;
  bulge: boolean;
  nucleus: boolean;
};
export type ComponentKey = keyof Components;
export type AccelerationComponents = Record<ComponentKey | "total", Vec3>;
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
const zero = (): Vec3 => [0, 0, 0];
const add = (a: Vec3, b: Vec3): Vec3 => [
  a[0] + b[0],
  a[1] + b[1],
  a[2] + b[2],
];
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
  // NFW M(<r)=A[ln(1+u)-u/(1+u)], u=r/r_s, A=4πρ_s r_s³.
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
  accelerationComponents(q: Vec3): AccelerationComponents {
    const [x, y, z] = q,
      r = Math.hypot(x, y, z),
      c = this.components;
    if (!Number.isFinite(r)) throw new RangeError("Posição não finita");
    if (r === 0 && (c.halo || c.bulge || c.nucleus))
      throw new RangeError("Força cuspada indefinida no centro");
    const scale = (a: Vec3): Vec3 => a.map((v) => v * ACCELERATION) as Vec3;
    const halo = c.halo
      ? (() => {
          const f = -(G * haloMass(r)) / r ** 3;
          return scale([f * x, f * y, f * z]);
        })()
      : zero();
    // Hernquist: a_vec = -G M r_vec / [r (r+a)^2].
    const bulge = c.bulge
      ? (() => {
          const f = -(G * MODEL.bulge.mass) / (r * (r + MODEL.bulge.a) ** 2);
          return scale([f * x, f * y, f * z]);
        })()
      : zero();
    // The nuclear Hernquist term is independent of the extended bulge term.
    const nucleus = c.nucleus
      ? (() => {
          const f =
            -(G * MODEL.nucleus.mass) /
            (r * (r + MODEL.nucleus.a) ** 2);
          return scale([f * x, f * y, f * z]);
        })()
      : zero();
    // Miyamoto–Nagai: B=a+sqrt(z²+b²), D=sqrt(R²+B²), a_z=-GM B z/(D³ sqrt(...)).
    const disk = c.disk
      ? (() => {
          const dz = Math.hypot(z, MODEL.disk.b),
            B = MODEL.disk.a + dz,
            fd = (-G * MODEL.disk.mass) / Math.hypot(x, y, B) ** 3;
          return scale([fd * x, fd * y, (fd * B * z) / dz]);
        })()
      : zero();
    const total = add(add(halo, bulge), add(nucleus, disk));
    return { halo, disk, bulge, nucleus, total };
  }
  acceleration(q: Vec3): Vec3 {
    return this.accelerationComponents(q).total;
  }
  circularSpeedComponents(R: number): Record<ComponentKey, number> {
    if (!(R > 0)) throw new RangeError("R deve ser positivo");
    const a = this.accelerationComponents([R, 0, 0]);
    // On z=0, v_c² = R ∂Φ/∂R = -R a_R. Components therefore add in v_c².
    const speed = (key: ComponentKey) =>
      Math.sqrt(Math.max(0, (-R * a[key][0]) / ACCELERATION));
    return {
      halo: speed("halo"),
      disk: speed("disk"),
      bulge: speed("bulge"),
      nucleus: speed("nucleus"),
    };
  }
  circularSpeed(R: number): number {
    const v = this.circularSpeedComponents(R);
    return Math.hypot(v.halo, v.disk, v.bulge, v.nucleus);
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
