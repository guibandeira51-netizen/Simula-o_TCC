import { GalacticPotential } from "./potentials";
import { copyState, leapfrog, type State } from "./integrator";
import { Monitor } from "./diagnostics";
/** One test particle; no interactions with decorative stars. */
export class PhysicsEngine {
  state: State;
  field: GalacticPotential;
  monitor: Monitor;
  constructor(field: GalacticPotential, initial: State) {
    this.field = field;
    this.state = copyState(initial);
    this.monitor = new Monitor(this.state, field);
  }
  step(h: number) {
    leapfrog(this.state, h, this.field);
  }
  diagnostics(h: number) {
    return this.monitor.measure(this.state, this.field, h);
  }
}
