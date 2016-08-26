import http from "http";

import CFG from "../cfg";

/**
 * @return {HTTP}
 */
export function createHTTPServer() {
  let server = http.createServer((req, res) => {
    if (this.world.isFull()) {
      this.print(`Server is full! Refused ${req.headers.host}`, 31);
      return void 0;
    }
    let chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      let buffer = Buffer.concat(chunks);
      req.body = buffer;
      this.world.getPlayerByRequest(req, res).then((player) => {
        this.routeRequest(player, req, res);
      });
    });
  });
  server.listen(CFG.PORT);
  return (server);
}

export function shutdown() {
  this.socket.close(() => {
    this.print("Closed http server!", 33);
    this.closeConnection(() => {
      this.print("Closed database connection!", 33);
      this.print("Server shutdown!", 31);
      setTimeout(() => process.exit(1), 2e3);
    });
  });
}