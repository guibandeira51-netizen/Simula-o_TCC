import { PhysicsEngine } from "../physics/Engine";
import { GalacticPotential, type Components } from "../physics/potentials";
import { invariants } from "../physics/diagnostics";
import { cylindricalVelocity, speedKmS } from "../physics/kinematics";
import type { State } from "../physics/integrator";

/** Both engines clone this exact state; only the halo switch differs. */
export function createComparison(components: Components, initial: State) {
  return {
    primary: new PhysicsEngine(new GalacticPotential(components), initial),
    comparison: new PhysicsEngine(new GalacticPotential({ ...components, halo: false }), initial),
  };
}

export function scenarioLabel(c: Readonly<Components>): string {
  const terms = [c.bulge && "bojo", c.disk && "disco", c.halo && "halo NFW"].filter(Boolean).join(" + ");
  const name = c.bulge && c.disk && c.halo ? "Potencial completo" : c.halo ? "Potencial selecionado" : "Potencial bariônico";
  return `${name} — ${terms || "campo nulo"}`;
}

/** Phi(infinity)=0. Classification is energetic, never inferred from the image. */
export function orbitalBinding(energy: number): "Órbita ligada" | "Órbita não ligada" {
  if (!Number.isFinite(energy)) throw new RangeError("Energia não finita");
  return energy < 0 ? "Órbita ligada" : "Órbita não ligada";
}

export function initialDiagnostics(initial: State, field: GalacticPotential) {
  const { R, vR, vPhi, vz } = cylindricalVelocity(initial.q, initial.v);
  const inv = invariants(initial, field);
  const speed = speedKmS(initial.v), vc = field.circularSpeed(R);
  return { ...inv, R, vR, vPhi, vz, speed, vc, speedMinusCircular: speed - vc,
    relativeSpeedOffset: vc > 0 ? speed / vc - 1 : null, binding: orbitalBinding(inv.E) };
}
