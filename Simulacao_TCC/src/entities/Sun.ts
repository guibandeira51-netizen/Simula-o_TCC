import * as THREE from "three";
/** Exaggerated screen marker, NOT the solar radius or stellar luminosity. */
export class SunEntity {
  mesh: THREE.Sprite;
  constructor(scene: THREE.Scene, color = 0xf5c47b, layer = 1) {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!,
      g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "#fff");
    g.addColorStop(0.15, "#fff");
    g.addColorStop(0.3, "rgba(255,255,255,.6)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    this.mesh = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(canvas),
        color,
        depthTest: false,
        depthWrite: false,
        transparent: true,
      }),
    );
    this.mesh.scale.setScalar(0.8);
    this.mesh.layers.set(layer);
    this.mesh.renderOrder = 5;
    scene.add(this.mesh);
  }
  update(q: readonly number[], camera: THREE.Camera) {
    this.mesh.position.set(q[0], q[1], q[2]);
    this.mesh.scale.setScalar(
      this.mesh.position.distanceTo(camera.position) * 0.012,
    );
  }
}
