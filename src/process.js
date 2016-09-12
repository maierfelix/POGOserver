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
      print(`${length}/${CFG.MAX_CONNECTIONS} connected players!`, 33);
    break;
    // Exit the server
    case "/exit":
      this.shutdown();
    break;
    case "/kick":
      this.world.kickPlayer(data[0]);
    break;
    case "/kickall":
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
      this.spawnPkmnAtPlayer(data[0], data[1], data[2] || 1);
    break;
    case "/dump":
      print("Preparing dump session..");
      this.onFirstRun(() => {
        print("Dumped assets successfully!");
      });
    break;
    default:
      print(`${cmd} is not a valid command!`, 31);
    break;
  };
};

export function stdinInput(data) {
  if (data.length <= 1) return void 0;
  let args = data.split(" ");
  let cmds = args.shift()
  this.processCommand(cmds, args);
};

export function uncaughtException(e) {
  switch (e.errno) {
    case "EADDRINUSE":
      print(`Port ${CFG.PORT} is already in use!`, 31);
    break;
    case "EACCES":
      print("No root privileges!", 31);
    break;
    default:
      print("Unhandled exception occurred: ", 31);
      print(e, 31);
      print(e.stack, 31);
    break;
  };
  print("The server has crashed!", 31);
};