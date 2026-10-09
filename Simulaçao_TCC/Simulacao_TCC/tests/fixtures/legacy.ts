// ARCHIVED BASELINE ONLY. Unreferenced legacy values; never imported by the application.
// FÍSICA ESTRITAMENTE PRESERVADA (N-Corpos Leapfrog + Hernquist + Miyamoto-Nagai + NFW)
export class PhysicsEngine {
  G = 4.30091e-6; // kpc (km/s)^2 / Msun
  KM_S_TO_KPC_GYR = 1.022712165045695;
  ACC_CONV = this.KM_S_TO_KPC_GYR * this.KM_S_TO_KPC_GYR; // kpc/Gyr^2
  EPS = 1e-12;

  rs = 16.0;
  rho0 = 0.0143 * 1e9;

  Sigma0 = 500 * 1e6;
  Rd = 3.0;
  Md = 2 * Math.PI * this.Sigma0 * this.Rd * this.Rd;
  ad = 3.0;
  bd = 0.25;

  Mb = 1e10;
  a = 0.7;

  r0 = 8.2;
  z0 = 0.02;
  e_target = 0.05;

  t = 0.0;
  x = 0;
  y = 0;
  z = 0;
  vx = 0;
  vy = 0;
  vz = 0;

  useHalo = true;
  useDisk = true;
  useBulge = true;

  constructor() {
    this.reset();
  }

  haloMassEnclosed(r: number) {
    let x = r / this.rs;
    return (
      4 *
      Math.PI *
      this.rho0 *
      Math.pow(this.rs, 3) *
      (Math.log(1 + x) - x / (1 + x))
    );
  }

  vHalo(r: number) {
    return Math.sqrt(
      (this.G * this.haloMassEnclosed(Math.max(r, this.EPS))) /
        Math.max(r, this.EPS),
    );
  }
  vBulge(r: number) {
    return Math.sqrt(
      (this.G * this.Mb * Math.max(r, this.EPS)) /
        Math.pow(Math.max(r, this.EPS) + this.a, 2),
    );
  }
  vDisk(r: number) {
    let rm = Math.max(r, this.EPS);
    return Math.sqrt(
      (this.G * this.Md * rm * rm) /
        Math.pow(rm * rm + Math.pow(this.ad + this.bd, 2), 1.5),
    );
  }

  vTotal(r: number) {
    let v2 = 0;
    if (this.useHalo) v2 += Math.pow(this.vHalo(r), 2);
    if (this.useDisk) v2 += Math.pow(this.vDisk(r), 2);
    if (this.useBulge) v2 += Math.pow(this.vBulge(r), 2);
    return Math.sqrt(v2);
  }

  kappa(r: number) {
    r = Math.max(r, this.EPS);
    let dr = Math.max(0.01 * r, 1e-4);
    let vp = this.vTotal(r + dr) * this.KM_S_TO_KPC_GYR;
    let vm = this.vTotal(Math.max(r - dr, this.EPS)) * this.KM_S_TO_KPC_GYR;
    let v0_loc = this.vTotal(r) * this.KM_S_TO_KPC_GYR;
    let dvc_dr = (vp - vm) / (2 * dr);
    let kappa_sq = 2 * ((v0_loc * v0_loc) / (r * r) + (v0_loc / r) * dvc_dr);
    return Math.sqrt(Math.max(kappa_sq, 0.0));
  }

  accHalo(x: number, y: number, z: number) {
    if (!this.useHalo) return { ax: 0, ay: 0, az: 0 };
    let r = Math.sqrt(x * x + y * y + z * z);
    if (r < this.EPS) return { ax: 0, ay: 0, az: 0 };
    let factor = (-this.G * this.haloMassEnclosed(r)) / Math.pow(r, 3);
    return { ax: factor * x, ay: factor * y, az: factor * z };
  }

  accBulge(x: number, y: number, z: number) {
    if (!this.useBulge) return { ax: 0, ay: 0, az: 0 };
    let r = Math.sqrt(x * x + y * y + z * z);
    if (r < this.EPS) return { ax: 0, ay: 0, az: 0 };
    let factor = (-this.G * this.Mb) / (r * Math.pow(r + this.a, 2));
    return { ax: factor * x, ay: factor * y, az: factor * z };
  }

  accDisk(x: number, y: number, z: number) {
    if (!this.useDisk) return { ax: 0, ay: 0, az: 0 };
    let R2 = x * x + y * y;
    let z_term = Math.sqrt(z * z + this.bd * this.bd);
    let B = this.ad + z_term;
    let denom = Math.pow(R2 + B * B, 1.5);
    let ax = (-this.G * this.Md * x) / denom;
    let ay = (-this.G * this.Md * y) / denom;
    let az =
      z_term < this.EPS ? 0.0 : (-this.G * this.Md * B * z) / (z_term * denom);
    return { ax, ay, az };
  }

  accTotal(x: number, y: number, z: number) {
    let h = this.accHalo(x, y, z);
    let d = this.accDisk(x, y, z);
    let b = this.accBulge(x, y, z);
    return {
      ax: (h.ax + d.ax + b.ax) * this.ACC_CONV,
      ay: (h.ay + d.ay + b.ay) * this.ACC_CONV,
      az: (h.az + d.az + b.az) * this.ACC_CONV,
    };
  }

  potHalo(r: number) {
    if (!this.useHalo) return 0;
    return (
      -(
        4 *
        Math.PI *
        this.G *
        this.rho0 *
        Math.pow(this.rs, 3) *
        Math.log(1 + r / this.rs)
      ) / r
    );
  }
  potDisk(R: number, z: number) {
    if (!this.useDisk) return 0;
    return (
      -(this.G * this.Md) /
      Math.sqrt(
        R * R + Math.pow(this.ad + Math.sqrt(z * z + this.bd * this.bd), 2),
      )
    );
  }
  potBulge(r: number) {
    if (!this.useBulge) return 0;
    return -(this.G * this.Mb) / (r + this.a);
  }

  getEnergies() {
    let v2 =
      (this.vx * this.vx + this.vy * this.vy + this.vz * this.vz) /
      (this.KM_S_TO_KPC_GYR * this.KM_S_TO_KPC_GYR);
    let Ek = 0.5 * v2;
    let r = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    let R = Math.sqrt(this.x * this.x + this.y * this.y);
    let Ep = this.potHalo(r) + this.potDisk(R, this.z) + this.potBulge(r);
    return { Ek, Ep };
  }

  reset() {
    this.t = 0.0;
    this.x = this.r0;
    this.y = 0.0;
    this.z = this.z0;
    let tempHalo = this.useHalo;
    this.useHalo = true;
    let tempDisk = this.useDisk;
    this.useDisk = true;
    let tempBulge = this.useBulge;
    this.useBulge = true;

    let kappa0 = this.kappa(this.r0);
    let vR = this.e_target * kappa0 * this.r0;
    let v0 = this.vTotal(this.r0);

    this.useHalo = tempHalo;
    this.useDisk = tempDisk;
    this.useBulge = tempBulge;

    this.vx = vR;
    this.vy = v0 * this.KM_S_TO_KPC_GYR;
    this.vz = 7.0 * this.KM_S_TO_KPC_GYR;
  }

  step(dt: number) {
    let acc = this.accTotal(this.x, this.y, this.z);
    this.vx += 0.5 * acc.ax * dt;
    this.vy += 0.5 * acc.ay * dt;
    this.vz += 0.5 * acc.az * dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.z += this.vz * dt;
    acc = this.accTotal(this.x, this.y, this.z);
    this.vx += 0.5 * acc.ax * dt;
    this.vy += 0.5 * acc.ay * dt;
    this.vz += 0.5 * acc.az * dt;
    this.t += dt;
    return acc;
  }
}
