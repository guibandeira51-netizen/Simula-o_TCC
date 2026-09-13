/** Presentation timing: neither a physical parameter nor the integration step. */
export class SimulationClock {
  debt = 0;
  maxStepsPerFrame = 1000;
  advance(
    seconds: number,
    gyrPerSecond: number,
    h: number,
    step: () => boolean,
  ): number {
    this.debt += seconds * gyrPerSecond;
    let count = 0;
    while (this.debt >= h && count < this.maxStepsPerFrame) {
      this.debt -= h;
      count++;
      if (!step()) {
        this.debt = 0;
        break;
      }
    }
    return count;
  }
  reset() {
    this.debt = 0;
  }
}
