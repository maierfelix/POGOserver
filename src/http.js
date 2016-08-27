import http from "http";

import print from "./print";
import CFG from "../cfg";

/**
 * @return {HTTP}
 */
export function createHTTPServer() {
  let server = http.createServer((req, res) => {
    if (this.world.isFull()) {
      print(`Server is full! Refused ${req.headers.host}`, 31);
      return void 0;
    }
    let chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      let buffer = Buffer.concat(chunks);
      req.body = buffer;
      this.routeRequest(req, res);
    });
  });
  server.listen(CFG.PORT);
  return (server);
}

export function shutdown() {
  this.socket.close(() => {
    print("Closed http server!", 33);
    this.closeConnection(() => {
      print("Closed database connection!", 33);
      print("Server shutdown!", 31);
      setTimeout(() => process.exit(1), 2e3);
    });
  });
}