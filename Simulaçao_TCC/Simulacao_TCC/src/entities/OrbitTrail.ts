import * as THREE from "three";
import { VISUAL } from "../visualization/config";
export class OrbitTrail {
  line: THREE.LineSegments;
  geo = new THREE.BufferGeometry();
  positions = new Float32Array(VISUAL.trailSegments * 6);
  birth = new Float32Array(VISUAL.trailSegments * 2);
  count = 0;
  previous: number[] | null = null;
  material: THREE.ShaderMaterial;
  constructor(scene: THREE.Scene, color: number, layer = 1) {
    this.geo.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3).setUsage(
        THREE.DynamicDrawUsage,
      ),
    );
    this.geo.setAttribute(
      "birth",
      new THREE.BufferAttribute(this.birth, 1).setUsage(THREE.DynamicDrawUsage),
    );
    this.geo.setDrawRange(0, 0);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(color) },
        now: { value: 0 },
        span: { value: VISUAL.trailSegments },
      },
      vertexShader: `attribute float birth;varying float age;uniform float now;uniform float span;void main(){age=clamp(1.-(now-birth)/span,0.,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `uniform vec3 color;varying float age;void main(){gl_FragColor=vec4(color,.12+.75*age);}`,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
    this.line = new THREE.LineSegments(this.geo, this.material);
    this.line.layers.set(layer);
    this.line.frustumCulled = false;
    this.line.renderOrder = 4;
    scene.add(this.line);
  }
  addPoint(q: readonly number[]) {
    if (this.previous) {
      const slot = this.count % VISUAL.trailSegments;
      this.positions.set(this.previous, slot * 6);
      this.positions.set(q, slot * 6 + 3);
      this.birth.set([this.count, this.count], slot * 2);
      this.count++;
      this.material.uniforms.now.value = this.count;
      this.geo.setDrawRange(0, Math.min(this.count, VISUAL.trailSegments) * 2);
      this.geo.attributes.position.needsUpdate = true;
      this.geo.attributes.birth.needsUpdate = true;
    }
    this.previous = [...q];
  }
  clear() {
    this.count = 0;
    this.previous = null;
    this.geo.setDrawRange(0, 0);
  }
}
