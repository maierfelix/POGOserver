import CFG from "../cfg";

export function startCycle() {
  this.cycleInstance = setTimeout(() => this.cycle(), CFG.TICK_INTERVAL);
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

  this.resetTimers();

  return void 0;

}

export function updateTimers() {
  let local = Date.now();
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
    // Player timeout tick, not precise
    this.playerTimeoutTick();
  }
  this.saveTick++;
  // Save interval
  if (this.saveTick >= CFG.SAVE_INTERVAL) {
    //this.saveAllPlayers();
    this.saveTick = 0;
  }
  return void 0;
}

export function playerTimeoutTick() {

  let player = null;
  let maxTimeout = CFG.PLAYER_CONNECTION_TIMEOUT;

  let players = this.world.players;

  let ii = 0;
  let length = players.length;

  for (; ii < length; ++ii) {
    player = players[ii];
    if (this.time - player.timeout >= maxTimeout) {
      this.print(`${player.remoteAddress} timed out`, 34);
      this.savePlayer(player);
      this.removePlayer(player);
    }
  };

}