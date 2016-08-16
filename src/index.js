import fs from "fs";
import http from "http";
import proto from "./proto";

import {
  inherit
} from "./utils";

import * as CFG from "../cfg";

import pogodown from "pogo-asset-downloader";

import * as _setup from "./setup";
import * as _cycle from "./cycle";
import * as _player from "./player";
import * as _request from "./request";
import * as _response from "./response";
import * as _process from "./process";
import * as _mongo from "./db/mongo";
import * as _mysql from "./db/mysql";

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

    let remoteAddress = client.headers.host;

    let ii = 0, length = this.clients.length;

    for (; ii < length; ++ii) {
      if (this.clients[ii].remoteAddress === remoteAddress) {
        return (true);
      }
    };

    return (false);

  }

  createAssetDownloadSession() {

    return new Promise((resolve) => {
      pogodown.login({
        provider: String(CFG.SERVER_POGO_CLIENT_PROVIDER).toLowerCase(),
        username: CFG.SERVER_POGO_CLIENT_USERNAME,
        password: CFG.SERVER_POGO_CLIENT_PASSWORD,
        downloadModels: false
      }).then(() => {
        this.print("Created asset download session");
        resolve();
      });
    });

  }

  /**
   * @param  {Array} assets
   */
  generateDownloadUrlByAssetId(assets) {
    return new Promise((resolve) => {
      pogodown.getAssetByAssetId(assets).then((response) => {
        // maybe cache and provide own local download link?
        resolve(response);
      });
    });
  }

  /**
   * @return {HTTP}
   */
  createHTTPServer() {
    let server = http.createServer((req, res) => {
      if (this.clients.length >= CFG.SERVER_MAX_CONNECTIONS) {
        this.print(`Server is full! Refused ${req.headers.host}`, 31);
        return void 0;
      }
      this.response = res;
      // client already connected
      if (!this.clientAlreadyConnected(req)) {
        this.addPlayer(req);
      }
      let chunks = [];
      req.on("data", (chunk) => {
        chunks.push(chunk);
      });
      req.on("end", () => {
        let buffer = Buffer.concat(chunks);
        req.body = buffer;
        this.request = req;
        this.routeRequest(req, res);
      });
    });
    server.listen(CFG.SERVER_PORT);
    return (server);
  }

  setupDatabaseConnection() {

    return new Promise((resolve) => {

      let name = String(CFG.SERVER_USE_DATABASE).toUpperCase();

      switch (name) {
        case "MONGO":
        case "MONGODB":
          inherit(GameServer, _mongo);
          this.setupConnection().then(resolve);
        break;
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
    color = Number.isInteger(color) ? color : CFG.SERVER_DEFAULT_CONSOLE_COLOR;
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

let server = new GameServer();

process.openStdin().addListener("data", function(data) {
  server.stdinInput(data);
});

process.on("uncaughtException", function(data) {
  server.uncaughtException(data);
});