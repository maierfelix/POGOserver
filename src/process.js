import * as CFG from "../cfg";

export function processCommand(cmd, data) {
  switch (cmd) {
    // How many active connections there are
    case "/clients":
      let length = this.clients.length;
      this.print(`${length} connected player${length === 1 ? "": "s"}!`, 33);
    break;
    // Kill the server
    case "/exit":
      this.print("Killed the server!", 31);
      process.exit();
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
      this.print(`Port ${CFG.SERVER_PORT} is already in use!`, 31);
    break;
    case "EACCES":
      this.print("No root privileges!", 31);
    break;
    default:
      console.log("Unhandled exception occurred: ", excp.code);
      console.log(excp.stack);
    break;
  };
  this.print("The server has crashed!", 31);
};