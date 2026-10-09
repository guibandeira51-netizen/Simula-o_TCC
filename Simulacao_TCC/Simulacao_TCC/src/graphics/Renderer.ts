import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { VISUAL } from "../visualization/config";
export class GraphicsCore {
  scene = new THREE.Scene();
  renderer: THREE.WebGLRenderer;
  camera1 = new THREE.PerspectiveCamera(42, 1, 0.03, 1200);
  camera2 = new THREE.PerspectiveCamera(42, 1, 0.03, 1200);
  controls1: OrbitControls;
  controls2: OrbitControls;
  splitMode = false;
  hit1 = document.getElementById("camera-left")!;
  hit2 = document.getElementById("camera-right")!;
  constructor() {
    this.scene.background = new THREE.Color("#03060d");
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(
      Math.min(devicePixelRatio, VISUAL.maxPixelRatio),
    );
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.autoClear = false;
    document
      .getElementById("canvas-container")!
      .appendChild(this.renderer.domElement);
    this.camera1.up.set(0, 0, 1);
    this.camera2.up.set(0, 0, 1);
    this.camera1.position.set(0, -55, 45);
    this.camera2.position.copy(this.camera1.position);
    this.camera1.layers.enable(1);
    this.camera2.layers.enable(2);
    this.controls1 = new OrbitControls(this.camera1, this.hit1);
    this.controls2 = new OrbitControls(this.camera2, this.hit2);
    for (const c of [this.controls1, this.controls2]) {
      c.enableDamping = true;
      c.dampingFactor = 0.08;
      c.minDistance = 1;
      c.maxDistance = 150;
      c.maxPolarAngle = Math.PI - 0.01;
    }
    this.controls2.enabled = false;
    window.addEventListener("resize", () => this.onResize());
    this.onResize();
  }
  setSplit(value: boolean) {
    this.splitMode = value;
    this.hit1.style.width = value ? "50%" : "100%";
    this.hit2.style.display = value ? "block" : "none";
    this.controls2.enabled = value;
    this.camera2.position.copy(this.camera1.position);
    this.controls2.target.copy(this.controls1.target);
    this.onResize();
  }
  onResize() {
    const w = innerWidth,
      h = innerHeight;
    this.renderer.setSize(w, h);
    for (const c of [this.camera1, this.camera2]) {
      c.aspect = w / (this.splitMode ? 2 : 1) / h;
      c.zoom = Math.min(1, c.aspect / 0.9);
      if (w <= 580 && !document.body.classList.contains("hide-panels")) {
        const width = w / (this.splitMode ? 2 : 1);
        c.setViewOffset(width, h, 0, h * 0.21, width, h);
      } else {
        c.clearViewOffset();
      }
      c.updateProjectionMatrix();
    }
  }
  view(mode: "global" | "top" | "edge") {
    const p =
      mode === "top"
        ? [0, -0.01, 68]
        : mode === "edge"
          ? [0, -64, 3]
          : [0, -55, 45];
    for (const [cam, ctl] of [
      [this.camera1, this.controls1],
      [this.camera2, this.controls2],
    ] as const) {
      cam.position.set(p[0], p[1], p[2]);
      ctl.target.set(0, 0, 0);
      ctl.update();
    }
  }
  render() {
    this.controls1.update();
    if (this.splitMode) this.controls2.update();
    const w = innerWidth,
      h = innerHeight;
    this.renderer.setScissorTest(false);
    this.renderer.clear();
    this.renderer.setScissorTest(true);
    this.renderer.setViewport(0, 0, w / (this.splitMode ? 2 : 1), h);
    this.renderer.setScissor(0, 0, w / (this.splitMode ? 2 : 1), h);
    this.renderer.render(this.scene, this.camera1);
    if (this.splitMode) {
      this.renderer.setViewport(w / 2, 0, w / 2, h);
      this.renderer.setScissor(w / 2, 0, w / 2, h);
      this.renderer.render(this.scene, this.camera2);
    }
  }
}
