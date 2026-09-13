import * as THREE from "three";
import { VISUAL as V, randomGenerator } from "../visualization/config";
import {
  starVertexShader,
  starFragmentShader,
  dustVertexShader,
  dustFragmentShader,
} from "../shaders/GalaxyShaders";

/** Immutable decorative buffers. No import from physics and no particle feedback. */
export class Galaxy {
  group = new THREE.Group();
  constructor(scene: THREE.Scene) {
    scene.add(this.group);
    this.build();
  }
  build(quality = 1) {
    for (const child of [...this.group.children]) {
      const p = child as THREE.Points;
      p.geometry.dispose();
      (p.material as THREE.Material).dispose();
      this.group.remove(p);
    }
    const rng = randomGenerator(V.seed),
      u = () => Math.max(Number.EPSILON, rng());
    const normal = () =>
      Math.sqrt(-2 * Math.log(u())) * Math.cos(2 * Math.PI * u());
    const exponentialRadius = () => {
      let r;
      do {
        r = -V.diskScale * Math.log(u() * u());
      } while (r > V.diskEdge);
      return r;
    };
    const armAngle = (r: number, arm: number) =>
      (arm * 2 * Math.PI) / V.arms +
      Math.log(r / V.armStart) / Math.tan((V.pitchDegrees * Math.PI) / 180);
    const count = Math.floor(V.starCount * quality),
      pos = new Float32Array(count * 3),
      col = new Float32Array(count * 3),
      size = new Float32Array(count),
      alpha = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const pop = rng();
      let r: number,
        z: number,
        theta: number,
        color: THREE.Color,
        brightness: number;
      if (pop < V.bulgeFraction) {
        // Truncated Hernquist cumulative radial distribution; flattening is visual.
        const maxF = (V.bulgeEdge / (V.bulgeEdge + V.bulgeScale)) ** 2,
          s = Math.sqrt(u() * maxF);
        const radius = (V.bulgeScale * s) / (1 - s),
          mu = 2 * rng() - 1;
        r = radius * Math.sqrt(1 - mu * mu);
        z = radius * mu * V.bulgeFlattening;
        theta = 2 * Math.PI * rng();
        color = new THREE.Color().setRGB(
          1,
          0.43 + 0.18 * rng(),
          0.18 + 0.15 * rng(),
        );
        brightness = 0.07 * (0.15 + Math.min(r / 0.8, 1));
      } else if (pop < V.bulgeFraction + V.haloFraction) {
        const radius = V.haloEdge * Math.pow(u(), 0.6),
          mu = 2 * rng() - 1;
        r = radius * Math.sqrt(1 - mu * mu);
        z = radius * mu;
        theta = 2 * Math.PI * rng();
        color = new THREE.Color(0.63, 0.67, 0.8);
        brightness = 0.12;
      } else if (pop < V.bulgeFraction + V.haloFraction + V.armFraction) {
        do {
          r = exponentialRadius();
        } while (r < V.armStart);
        const arm = Math.floor(rng() * V.arms),
          clumps = 1 + 0.45 * Math.sin(r * 2.3 + arm * 1.7);
        theta = armAngle(r, arm) + (normal() * V.armWidth * clumps) / r;
        r += normal() * 0.15;
        z = normal() * V.armHeight;
        const hii = rng() < 0.012;
        color = hii
          ? new THREE.Color(1, 0.18, 0.35)
          : new THREE.Color(0.22 + 0.3 * rng(), 0.42 + 0.3 * rng(), 1);
        brightness = hii ? 0.4 : 0.2;
      } else {
        r = exponentialRadius();
        theta = 2 * Math.PI * rng();
        z = normal() * (rng() < 0.15 ? V.thickHeight : V.thinHeight);
        color = new THREE.Color(
          0.78 + 0.22 * rng(),
          0.72 + 0.22 * rng(),
          0.64 + 0.3 * rng(),
        );
        brightness = 0.17;
      }
      pos.set([r * Math.cos(theta), r * Math.sin(theta), z], i * 3);
      col.set(color.toArray(), i * 3);
      size[i] = 0.35 + Math.min(4, Math.exp(normal() * 0.7)) * 0.65;
      alpha[i] =
        (brightness * (0.45 + 0.55 * rng()) * V.starExposure) /
        Math.sqrt(quality);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("customColor", new THREE.BufferAttribute(col, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(size, 1));
    geo.setAttribute("alphaMult", new THREE.BufferAttribute(alpha, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.group.add(new THREE.Points(geo, mat));
    const n = Math.floor(V.dustCount * quality),
      dp = new Float32Array(n * 3),
      ds = new Float32Array(n),
      da = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      let r;
      do {
        r = exponentialRadius();
      } while (r < V.armStart);
      const theta = armAngle(r, i % V.arms) - 0.04 + (normal() * 0.1) / r;
      dp.set(
        [r * Math.cos(theta), r * Math.sin(theta), normal() * 0.045],
        i * 3,
      );
      ds[i] = 0.8 + rng() * 1.7;
      da[i] = 0.05 + rng() * 0.08;
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute("position", new THREE.BufferAttribute(dp, 3));
    dg.setAttribute("size", new THREE.BufferAttribute(ds, 1));
    dg.setAttribute("opacity", new THREE.BufferAttribute(da, 1));
    const dm = new THREE.ShaderMaterial({
      vertexShader: dustVertexShader,
      fragmentShader: dustFragmentShader,
      transparent: true,
      depthWrite: false,
    });
    const dust = new THREE.Points(dg, dm);
    dust.renderOrder = 1;
    this.group.add(dust);
    // Smooth unresolved starlight: a display layer, not emissivity calibrated to observations.
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(V.diskEdge * 2, V.diskEdge * 2),
      new THREE.ShaderMaterial({
        uniforms: {
          edge: { value: V.diskEdge },
          pitch: { value: (V.pitchDegrees * Math.PI) / 180 },
          arms: { value: V.arms },
          start: { value: V.armStart },
        },
        vertexShader: `varying vec2 xy;void main(){xy=position.xy;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader: `varying vec2 xy;uniform float edge;uniform float pitch;uniform float arms;uniform float start;
        void main(){float r=length(xy);float theta=atan(xy.y,xy.x);float phase=arms*(theta-log(max(r,start)/start)/tan(pitch));
        float ridge=pow(.5+.5*cos(phase),10.)*smoothstep(start,start+1.,r);
        float a=(.05+.10*ridge)*exp(-r/6.)*(1.-smoothstep(edge*.7,edge,r));
        vec3 color=mix(vec3(1.,.53,.20),vec3(.15,.35,1.),smoothstep(1.,5.,r));gl_FragColor=vec4(color,a);}`,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    );
    glow.renderOrder = -1;
    this.group.add(glow);
  }
}
