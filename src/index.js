import fs from "fs";
import os from "os";
import request from "request";
import readline from "readline";
import POGOProtos from "pokemongo-protobuf";

import {
  _toCC,
  deXOR,
  inherit,
  getHashCodeFrom
} from "./utils";

import print from "./print";
import CFG from "../cfg";

import World from "./models/World";

import * as _api from "./api";
import * as _commands from "./commands";
import * as _dump from "./dump";
import * as _http from "./http";
import * as _setup from "./setup";
import * as _cycle from "./cycle";
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
export default class GameServer {

  /** @constructor */
  constructor() {

    this.STATES = {
      PAUSE: false,
      DEBUG: false,
      CRASH: false
    };

    this.db = null;

    this.repository = null;

    this.apiClients = {};

    this.socket = null;
    this.cycleInstance = null;

    // Timer things
    this.tick = 0;
    this.time = 0;
    this.fullTick = 0;
    this.saveTick = 0;
    this.spawnTick = 0;
    this.timeoutTick = 0;
    this.passedTicks = 0;

    if (CFG.GREET) this.greet();

    this.getLatestVersion().then((latest) => {
      print(this.repository);
      let current = require("../package.json").version;
      print(`Booting Server v${current}`, 33);
      if (current < latest) {
        print(`WARNING: Please update to the latest build v${latest}!`, 33);
      }
      this.setup().then(() => {
        this.world = new World(this);
      });
    });

  }

  fetchVersioningUrl() {
    return new Promise((resolve) => {
      let url = "";
      let branch = "master";
      let base = "https://raw.githubusercontent.com";
      url = require("../package.json").repository.url;
      url = url.replace("git://", "");
      url = url.replace(".git", "");
      url = url.replace("github.com/", "");
      this.repository = `https://github.com/${url}`;
      url = `${base}/${url}/${branch}/package.json`;
      resolve(url);
    });
  }

  getLatestVersion() {
    return new Promise((resolve) => {
      this.fetchVersioningUrl().then((url) => {
        request({url: url}, (error, response, body) => {
          let json = null;
          try {
            json = JSON.parse(body);
          } catch (e) {
            json = {};
            print(e, 31);
          }
          resolve(json.version);
        });
      });
    });
  }

  /**
   * @param {Object} obj
   * @return {Boolean}
   */
  isApiCall(call) {
    let action = String(call.action);
    return (
      "api_" + action in _api
    );
  }

  /**
   * @param {String} msg
   * @param {Function} fn
   * @param {Number} timer
   */
  retry(msg, fn, timer) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    print(`${msg}${timer}s`, 33, true);
    if (timer >= 1) setTimeout(() => this.retry(msg, fn, --timer), 1e3);
    else {
      process.stdout.write("\n");
      fn();
    }
  }

  /**
   * @return {String}
   */
  getLocalIPv4() {
    let address = null;
    let interfaces = os.networkInterfaces();
    for (var dev in interfaces) {
      interfaces[dev].filter((details) => details.family === "IPv4" && details.internal === false ? address = details.address: void 0);
    };
    return (address);
  }

  /**
   * @param {Buffer} buffer
   * @param {String} schema
   */
  parseProtobuf(buffer, schema) {
    try {
      return POGOProtos.parseWithUnknown(buffer, schema);
    } catch (e) {
      print(e, 31);
    }
  }

  /**
   * @param {String} path
   * @return {Boolean}
   */
  fileExists(path) {
    try {
      fs.statSync(path);
    } catch (e) {
      return (false);
    }
    return (true);
  }

  /**
   * @return {String}
   */
  getCurrentTime() {
    let date = new Date();
    return (
      `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    );
  }

  greet() {
    console.log(greetMessage);
  }

}

inherit(GameServer, _api);
inherit(GameServer, _commands);
inherit(GameServer, _dump);
inherit(GameServer, _http);
inherit(GameServer, _setup);
inherit(GameServer, _cycle);
inherit(GameServer, _request);
inherit(GameServer, _response);
inherit(GameServer, _process);
inherit(GameServer, _mysql);
inherit(GameServer, _mysql_get);
inherit(GameServer, _mysql_query);
inherit(GameServer, _mysql_create);

(() => {

  const server = new GameServer();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on("line", (data) => {
    server.stdinInput(data);
  });

  process.on("uncaughtException", (data) => {
    server.uncaughtException(data);
  });

})();
