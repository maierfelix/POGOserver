import CFG from "../cfg";

/**
 * @param {String} msg
 * @param {Number} color
 * @param {Boolean} nl
 */
export default function print(msg, color, newline) {
  color = Number.isInteger(color) ? color : CFG.DEFAULT_CONSOLE_COLOR;
  process.stdout.write(`[Console] \x1b[${color};1m${msg}\x1b[0m${newline === void 0 ? "\n" : ""}`);
}