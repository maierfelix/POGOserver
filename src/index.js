import fs from "fs";
import os from "os";
import fse from "fs-extra";
import http from "http";
import proto from "./proto";
import decode from "pogo-decode";

import {
  inherit
} from "./utils";

import CFG from "../cfg";

import pogodown from "pogo-asset-downloader";

import * as _setup from "./setup";
import * as _cycle from "./cycle";
import * as _player from "./player";
import * as _request from "./request";
import * as _response from "./response";
import * as _process from "./process";
import * as _mysql from "./db/index";
import * as _mysql_get from "./db/get";
import * as _mysql_query from "./db/query";
import * as _mysql_create from "./db/create";

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

    this.asset = null;
    this.master = null;
    this.socket = null;
    this.cycleInstance = null;

    // Timer things
    this.tick = 0;
    this.time = 0;
    this.fullTick = 0;
    this.saveTick = 0;
    this.timeoutTick = 0;
    this.passedTicks = 0;

    this.clients = [];
    this.wild_pokemons = [];

    this.greet();

    this.print(`Booting Server v${require("../package.json").version}...`, 33);

    this.setup();

  }

  clientAlreadyConnected(client) {

    let remoteAddress = client.headers.host;

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
      if (this.clients.length >= CFG.MAX_CONNECTIONS) {
        this.print(`Server is full! Refused ${req.headers.host}`, 31);
        return void 0;
      }

      let player = null;

      if (this.clientAlreadyConnected(req)) player = this.getPlayerByRequest(req);
      else player = this.addPlayer(req, res);

      let chunks = [];
      req.on("data", (chunk) => {
        chunks.push(chunk);
      });
      req.on("end", () => {
        let buffer = Buffer.concat(chunks);
        req.body = buffer;
        player.updateResponse(res);
        this.routeRequest(req, res);
      });
    });
    server.listen(CFG.PORT);
    return (server);
  }

  setupDatabaseConnection() {

    return new Promise((resolve) => {

      let name = String(CFG.DATABASE_TYPE).toUpperCase();

      switch (name) {
        case "MYSQL":
          inherit(GameServer, _mysql);
          this.setupConnection().then(resolve);
        break;
        default:
          this.print("Invalid database connection type!", 31);
          return void 0;
        break;
      };

    });

  }

  shutdown() {
    this.socket.close(() => {
      this.print("Closed http server!", 33);
      this.closeConnection(() => {
        this.print("Closed database connection!", 33);
        this.print("Server shutdown!", 31);
        setTimeout(() => process.exit(1), 2e3);
      });
    });
  }

  /**
   * @param {String} msg
   * @param {Number} color
   * @param {Boolean} nl
   */
  print(msg, color, nl) {
    color = Number.isInteger(color) ? color : CFG.DEFAULT_CONSOLE_COLOR;
    process.stdout.write(`[Console] \x1b[${color};1m${msg}\x1b[0m${nl === void 0 ? "\n" : ""}`);
  }

  /**
   * @param {String} msg
   * @param {Function} func
   * @param {Number} timer
   */
  retry(msg, func, timer) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    this.print(`${msg}${timer}s`, 33, true);
    if (timer >= 1) setTimeout(() => this.retry(msg, func, --timer), 1e3);
    else {
      process.stdout.write("\n");
      func();
    }
  }

  dumpTraffic(req, res) {

    // decode opts
    let opts = {
      removeNulls: true,
      encodeBuffers: true
    };

    try {
      let decoded = JSON.stringify(decode(req, res, opts), null, 2);
      fse.outputFileSync(CFG.DEBUG_DUMP_PATH + Date.now(), decoded);
    } catch (e) {
      this.print("Dump traffic: " + e, 31);
    }

  }

  getLocalIPv4() {
    let address = null;
    let interfaces = os.networkInterfaces();
    for (var dev in interfaces) {
      interfaces[dev].filter((details) => details.family === "IPv4" && details.internal === false ? address = details.address: void 0);
    };
    return (address);
  }

  directoryExists(directory) { 
    try {
      fs.statSync(directory);
      return true;
    } catch(e) {
      return false;
    }
  }

  fileExists(path) {
    try {
      fs.statSync(path);
    } catch (e) {
      return (false);
    }
    return (true);
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
inherit(GameServer, _mysql);
inherit(GameServer, _mysql_get);
inherit(GameServer, _mysql_query);
inherit(GameServer, _mysql_create);

let server = new GameServer();

process.openStdin().addListener("data", function(data) {
  server.stdinInput(data);
});

process.on("uncaughtException", function(data) {
  server.uncaughtException(data);
});