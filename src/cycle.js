import * as CFG from "../cfg";

export function startCycle() {
  this.cycleInstance = setTimeout(() => this.cycle(), CFG.SERVER_TICK_INTERVAL);
}

export function stopCycle() {
  clearTimeout(this.cycleInstance);
}

export function cycle() {

  this.stopCycle();
  this.startCycle();

  if (this.STATES.PAUSE === true) return void 0;
  if (this.STATES.CRASH === true) return void 0;

  this.updateTimers();

  if (this.passedTicks <= 0) return void 0;

  this.updatePlayers();

  this.resetTimers();

  return void 0;

}

export function updateTimers() {
  let local = new Date();
  this.passedTicks = local - this.time;
  this.tick += this.passedTicks;
  this.time = local;
  return void 0;
}

export function resetTimers() {
  if (this.tick >= 25) {
    this.fullTick++;
    if (this.fullTick >= 2) {
      this.fullTick = 0;
    }
    this.tick = 0;
  }
  this.saveTick++;
  if (this.saveTick >= CFG.SERVER_SAVE_INTERVAL) {
    this.savePlayers();
    this.saveTick = 0;
  }
  return void 0;
}