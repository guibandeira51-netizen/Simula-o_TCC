import * as THREE from "three";
import type { State } from "../physics/integrator";
import { cylindricalVelocity, speedKmS } from "../physics/kinematics";
import { internalAccelerationToKmS2PerKpc } from "../physics/units";
import {
  type AccelerationComponents,
  GalacticPotential,
  type ComponentKey,
  type Vec3,
} from "../physics/potentials";
import { VISUAL } from "../visualization/config";

const VECTOR_KEYS: readonly ComponentKey[] = [
  "disk",
  "bulge",
  "nucleus",
  "halo",
];
const COLORS: Record<ComponentKey | "total" | "velocity", number> = {
  disk: 0x85b8ef,
  bulge: 0xf0a35b,
  nucleus: 0xffdf96,
  halo: 0x9d9de8,
  total: 0xffffff,
  velocity: 0x70dfbd,
};

function magnitude(v: Vec3): number {
  return Math.hypot(...v);
}
function configureMaterial(material: THREE.Material | THREE.Material[], opacity: number) {
  const target = Array.isArray(material) ? material[0] : material;
  target.transparent = true;
  if ("opacity" in target) (target as THREE.Material & { opacity: number }).opacity = opacity;
}

/** Display-only arrows. Directions and numerical values come from the physics field. */
export class VectorField {
  readonly group = new THREE.Group();
  private readonly arrows = new Map<string, THREE.ArrowHelper>();
  private readonly layer: number;

  constructor(scene: THREE.Scene, layer: number) {
    this.layer = layer;
    this.group.layers.set(layer);
    scene.add(this.group);
    for (const key of [...VECTOR_KEYS, "total"] as const) {
      const arrow = new THREE.ArrowHelper(
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(),
        1,
        COLORS[key],
        0.22,
        0.12,
      );
      configureMaterial(arrow.line.material, key === "total" ? 0.9 : 0.7);
      configureMaterial(arrow.cone.material, key === "total" ? 0.9 : 0.7);
      arrow.layers.set(layer);
      this.group.add(arrow);
      this.arrows.set(key, arrow);
    }
    const velocity = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(),
      1,
      COLORS.velocity,
      0.28,
      0.15,
    );
    configureMaterial(velocity.line.material, 0.95);
    configureMaterial(velocity.cone.material, 0.95);
    velocity.layers.set(layer);
    this.group.add(velocity);
    this.arrows.set("velocity", velocity);
    this.group.visible = false;
  }

  setVisible(value: boolean) {
    this.group.visible = value;
  }

  update(state: State, field: GalacticPotential) {
    const origin = new THREE.Vector3(...state.q);
    const components: AccelerationComponents = field.accelerationComponents(state.q);
    const magnitudes = [
      ...VECTOR_KEYS.map((key) => magnitude(components[key])),
      magnitude(components.total),
    ];
    const maxAcceleration = Math.max(...magnitudes, 1e-12);
    const accelerationScale = 3.2 / maxAcceleration;
    for (const key of [...VECTOR_KEYS, "total"] as const) {
      const vector = components[key];
      const length = Math.max(0.35, Math.min(5, magnitude(vector) * accelerationScale));
      this.updateArrow(this.arrows.get(key)!, origin, vector, length);
    }
    const velocity = state.v;
    const speed = magnitude(velocity);
    this.updateArrow(
      this.arrows.get("velocity")!,
      origin,
      velocity,
      Math.max(
        0.8,
        Math.min(6, (speedKmS(velocity) / VISUAL.vectorReferenceSpeedKmS) * 3),
      ),
    );
    const kin = cylindricalVelocity(state.q, state.v);
    this.group.userData.readout = {
      layer: this.layer,
      velocity: { vector: velocity, speedKmS: speedKmS(velocity), ...kin },
      acceleration: Object.fromEntries(
        ([...VECTOR_KEYS, "total"] as const).map((key) => [
          key,
          {
            vector: components[key],
            magnitudeKpcGyr2: magnitude(components[key]),
            magnitudeKmS2PerKpc: internalAccelerationToKmS2PerKpc(magnitude(components[key])),
          },
        ]),
      ),
    };
  }

  private updateArrow(
    arrow: THREE.ArrowHelper,
    origin: THREE.Vector3,
    vector: Vec3,
    length: number,
  ) {
    const direction = new THREE.Vector3(...vector);
    if (direction.lengthSq() < 1e-24) {
      arrow.visible = false;
      return;
    }
    arrow.visible = true;
    direction.normalize();
    arrow.position.copy(origin);
    arrow.setDirection(direction);
    arrow.setLength(length);
  }
}
