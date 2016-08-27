import fs from "fs";

import print from "./print";
import CFG from "../cfg";

const helpMessage = fs.readFileSync(".help", "utf8");

export function processCommand(cmd, data) {
  let players = this.world.players;
  switch (cmd) {
    // How many active connections there are
    case "/players":
      var length = players.length;
      print(`${length}:${CFG.MAX_CONNECTIONS} connected players!`, 33);
    break;
    // Exit the server
    case "/exit":
      this.shutdown();
    break;
    case "/kick":
      this.kickPlayer(data[1]);
    break;
    case "/killall":
      var length = players.length;
      this.removeAllPlayers();
      var result = length - players.length;
      print(`Removed ${result} player${result === 1 ? "": "s"}!`);
    break;
    case "/clear":
      process.stdout.write("\x1Bc");
      this.greet();
    break;
    case "/help":
      console.log("\x1b[36;1m==================================== HELP =====================================\x1b[0m");
      console.log(`\x1b[${CFG.DEFAULT_CONSOLE_COLOR};1m${helpMessage}\x1b[0m`);
      console.log("\x1b[36;1m===============================================================================\x1b[0m");
    break;
    case "/save":
      this.saveAllPlayers();
      var length = players.length;
      print(`Saved ${length} player${length === 1 ? "": "s"} into database!`);
    break;
    case "/spawn":
      this.spawnPkmnAtPlayer(data[1], data[2], data[3] || 1);
    break;
    case "/update":
      eval(fs.readFileSync("update.js", "utf8"));
    break;
    default:
      print(`${cmd} is not a valid command!`, 31);
    break;
  };
};

export function stdinInput(data) {
  data = data.toString().substring(0, data.length - 2);
  if (data.length < 1) return void 0;
  data = data.split(" ");
  var cmd = data[0];
  this.processCommand(cmd, data);
};

export function uncaughtException(excp) {
  switch (excp.errno) {
    case "EADDRINUSE":
      print(`Port ${CFG.PORT} is already in use!`, 31);
    break;
    case "EACCES":
      print("No root privileges!", 31);
    break;
    default:
      console.log("Unhandled exception occurred: ", excp.code);
      console.log(excp.stack);
    break;
  };
  print("The server has crashed!", 31);
};