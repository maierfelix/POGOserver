import fs from "fs";
import http from "http";
import proto from "./proto";

import {
  inherit,
  decodeLong
} from "./utils";

import * as CFG from "../cfg";

import * as _setup from "./setup";
import * as _cycle from "./cycle";
import * as _player from "./player";
import * as _request from "./request";
import * as _response from "./response";
import * as _process from "./process";
import * as _database from "./database";

const greetMessage = fs.readFileSync(".greet", "utf8");

/**
 * @class GameServer
 */
class GameServer {

  /** @constructor */
  constructor() {

    this.STATES = {
      PAUSE: false,
      DEBUG: false,
      CRASH: false
    };

    this.db = {
      instance: null,
      collections: {}
    };

    this.proto = null;
    this.socket = null;
    this.player = null;
    this.request = null;
    this.response = null;
    this.cycleInstance = null;

    // Timer things
    this.tick = 0;
    this.time = 0;
    this.fullTick = 0;
    this.saveTick = 0;
    this.timeoutTick = 0;
    this.passedTicks = 0;

    this.clients = [];

    this.greet();
    this.setup();

  }

  clientAlreadyConnected(client) {

    let remoteAddress = client.connection.remoteAddress;

    let ii = 0, length = this.clients.length;

    for (; ii < length; ++ii) {
      if (this.clients[ii].remoteAddress === remoteAddress) {
        return (true);
      }
    };

    return (false);

  }

  /**
   * @return {HTTP}
   */
  createHTTPServer() {
    let server = http.createServer((req, res) => {
      this.response = res;
      if (!this.clientAlreadyConnected(req)) {
        this.addPlayer(req.connection);
      }
      let chunks = [];
      req.on("data", (chunk) => {
        chunks.push(chunk);
      });
      req.on("end", () => {
        let buffer = Buffer.concat(chunks);
        req.body = buffer;
        this.request = req;
        this.onRequest(req, res);
      });
    });
    server.listen(CFG.SERVER_PORT);
    return (server);
  }

  /**
   * @param {String} msg
   * @param {Number} color
   */
  print(msg, color) {
    color = Number.isInteger(color) ? color : CFG.SERVER_DEFAULT_CONSOLE_COLOR;
    console.log(`\x1b[${color};1m${msg}\x1b[0m`);
  }

  greet() {
    console.log(greetMessage);
  }

}

inherit(GameServer, _setup);
inherit(GameServer, _cycle);
inherit(GameServer, _player);
inherit(GameServer, _request);
inherit(GameServer, _response);
inherit(GameServer, _process);
inherit(GameServer, _database);

let server = new GameServer();

process.openStdin().addListener("data", function(data) {
  server.stdinInput(data);
});

process.on("uncaughtException", function(data) {
  server.uncaughtException(data);
});