import * as THREE from "three";
import { randomGenerator } from "../visualization/config";
/** Sparse decorative distant sky, not a physical distribution in kpc. */
export class DeepSpace {
  constructor(scene: THREE.Scene) {
    const rng = randomGenerator(123),
      p = new Float32Array(1800 * 3),
      c = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i++) {
      const z = 2 * rng() - 1,
        phi = 2 * Math.PI * rng(),
        r = 600;
      p.set(
        [
          r * Math.sqrt(1 - z * z) * Math.cos(phi),
          r * Math.sqrt(1 - z * z) * Math.sin(phi),
          r * z,
        ],
        i * 3,
      );
      const b = 0.08 + 0.24 * rng();
      c.set([b * 0.8, b * 0.9, b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    g.setAttribute("color", new THREE.BufferAttribute(c, 3));
    scene.add(
      new THREE.Points(
        g,
        new THREE.PointsMaterial({
          size: 1,
          sizeAttenuation: false,
          vertexColors: true,
          transparent: true,
          opacity: 0.6,
          depthWrite: false,
        }),
      ),
    );
  }
}
