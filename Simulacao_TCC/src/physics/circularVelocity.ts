import { G, NUMERICS } from "../data/parameters";
import {
  GalacticPotential,
  type ComponentKey,
} from "./potentials";

export const COMPONENT_KEYS: readonly ComponentKey[] = [
  "disk",
  "bulge",
  "nucleus",
  "halo",
];

export interface RotationSample {
  R: number;
  disk: number;
  bulge: number;
  nucleus: number;
  halo: number;
  baryonic: number;
  total: number;
  discrepancy: number;
  fBar: number;
  fHalo: number;
  dynamicMassEquivalent: number;
}

export function rotationAt(field: GalacticPotential, R: number): RotationSample {
  const components = field.circularSpeedComponents(R);
  const baryonic2 =
    components.disk ** 2 + components.bulge ** 2 + components.nucleus ** 2;
  const total2 = baryonic2 + components.halo ** 2;
  const baryonic = Math.sqrt(baryonic2);
  const total = Math.sqrt(total2);
  return {
    R,
    ...components,
    baryonic,
    total,
    discrepancy: baryonic2 > 0 ? total2 / baryonic2 : Number.NaN,
    fBar: total2 > 0 ? baryonic2 / total2 : Number.NaN,
    fHalo: total2 > 0 ? components.halo ** 2 / total2 : Number.NaN,
    dynamicMassEquivalent: (R * total2) / G,
  };
}

export function rotationCurve(
  field: GalacticPotential,
  count = 160,
  min = NUMERICS.minRadius,
  max = NUMERICS.maxRadius,
): RotationSample[] {
  return Array.from({ length: count }, (_, i) =>
    rotationAt(field, min + ((max - min) * i) / (count - 1)),
  );
}
