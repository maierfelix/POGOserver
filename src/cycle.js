import print from "./print";
import CFG from "../cfg";

import Settings from "./modes";
const MAP_REFRESH_RATE = Settings.GAME_SETTINGS.map_settings.get_map_objects_max_refresh_seconds;

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
  if (this.tick >= 1e4) {
    this.fullTick++;
    if (this.fullTick >= 2) {
      this.fullTick = 0;
    }
    this.tick = 0;
    // Timeout ticks, not precise
    this.playerTimeoutTick();
    this.cellTimeoutTick();
  }
  this.saveTick++;
  // Save interval
  if (this.saveTick >= CFG.SAVE_INTERVAL) {
    this.saveAllPlayers();
    this.saveTick = 0;
  }
  this.spawnTick++;
  // Pkmn spawn interval
  if (this.spawnTick >= MAP_REFRESH_RATE * 1e3) {
    this.world.refreshSpawns();
    this.spawnTick = 0;
  }
  return void 0;
}

export function playerTimeoutTick() {
  let maxTimeout = CFG.PLAYER_CONNECTION_TIMEOUT;
  let ii = 0;
  let length = this.world.connectedPlayers;
  let player = null;
  let players = this.world.players;
  for (; ii < length; ++ii) {
    player = players[ii];
    if (this.time - player.timeout >= maxTimeout) {
      print(`${player.remoteAddress} timed out`, 34);
      this.savePlayer(player);
      this.removePlayer(player);
    }
  };
}

export function cellTimeoutTick() {
  let ii = 0;
  let length = this.world.cells.length;
  let cell = null;
  for (; ii < length; ++ii) {
    cell = this.world.cells[ii];
    if (cell.expiration - +new Date() <= 0) {
      cell.delete();
      length--;
    }
  };
}