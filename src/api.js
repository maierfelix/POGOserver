import CFG from "../cfg";

export function ready(e) {
  if (e) console.log(e);
  else console.log("Ready!");
}

/**
 * @param {String} msg
 * @param {Number} color
 * @param {Boolean} nl
 */
export function print(msg, color, newline) {
  color = Number.isInteger(color) ? color : CFG.DEFAULT_CONSOLE_COLOR;
  process.stdout.write(`[Console] \x1b[${color};1m${msg}\x1b[0m${newline === void 0 ? "\n" : ""}`);
}

/**
 * @param {Player} player
 */
export function registerPlayer(player) {
  console.log(player.username + " registered!");
}

/**
 * @param {Player} player
 */
export function loginPlayer(player) {
  console.log(player.username + " logged in!");
}

/**
 * @param {Player} player
 */
export function killPlayer(player) {
  console.log(player.username + " killed!");
}

/**
 * @param {Player} player
 */
export function updatePlayerAvatar(player) {
  console.log("Updated avatar of " + player.username + "!");
}