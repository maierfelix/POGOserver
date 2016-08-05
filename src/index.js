import fs from "fs";
import http from "http";

import { inherit } from "./utils";

import * as CFG from "../cfg";
import { REQUEST } from "../requests";

import * as _setup from "./setup";
import * as _cycle from "./cycle";
import * as _process from "./process";
import * as _database from "./database";

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

    this.paused = false;

    this.proto = null;
    this.socket = null;
    this.cycleInstance = null;

    // Timer things
    this.tick = 0;
    this.time = 0;
    this.fullTick = 0;
    this.saveTick = 0;
    this.passedTicks = 0;

    this.setup();

  }

  createHTTPServer() {
    this.socket = http.createServer(this.onRequest).listen(CFG.SERVER_PORT);
  }

  /**
   * @param {Request} req
   * @param {Response} resp
   */
  onRequest(req, resp) {
    if (this.validRequest(req)) {
      this.answer(valid);
    }
  }

  /**
   * @param {Request} req
   * @return {Boolean}
   */
  validRequest(req) {
    console.log(req);
    return (true);
  }

  /**
   * @param {String} msg
   * @param {Number} color
   */
  print(msg, color) {
    color = Number.isInteger(color) ? color : CFG.SERVER_DEFAULT_CONSOLE_COLOR;
    console.log(`\x1b[${color};1m${msg}\x1b[0m`);
  }

  /**
   * @param {Request} req
   */
  answer(req) {

    switch (req.request_type) {
      // #LOGIN START
      case REQUEST.GET_PLAYER:

      break;
      case REQUEST.GET_HATCHED_EGGS:

      break;
      case REQUEST.GET_INVENTORY:

      break;
      case REQUEST.CHECK_AWARDED_BADGES:

      break;
      case REQUEST.DOWNLOAD_SETTINGS:

      break;
      case REQUEST.DOWNLOAD_ITEM_TEMPLATES:
        
      break;
      // #LOGIN END
      case REQUEST.GET_PLAYER_PROFILE:
        
      break;
      case REQUEST.GET_MAP_OBJECTS:

      break;
      case REQUEST.GET_GYM_DETAILS:

      break;
    };

  }

  updatePlayers() {
    //this.print("Updating players");
    return void 0;
  }

  savePlayers() {
    this.print("Saving players into database");
    return void 0;
  }

}

inherit(GameServer, _setup);
inherit(GameServer, _cycle);
inherit(GameServer, _process);
inherit(GameServer, _database);

let server = new GameServer();

process.openStdin().addListener("data", function(data) {
  server.stdinInput(data);
});

process.on("uncaughtException", function(data) {
  server.uncaughtException(data);
});