import fs from "fs";
import os from "os";
import fse from "fs-extra";
import http from "http";
import proto from "./proto";
import EventEmitter from "events";

import {
  inherit,
  _toCC
} from "./utils";

import CFG from "../cfg";

import * as _api from "./api";
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
export default class GameServer extends EventEmitter {

  /** @constructor */
  constructor() {

    super(null);

    this.STATES = {
      PAUSE: false,
      DEBUG: false,
      CRASH: false
    };

    this.db = {
      instance: null,
      collections: {}
    };

    this.assets = {};
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

    this.initAPI();

    if (CFG.GREET) this.greet();

    this.print(`Booting Server v${require("../package.json").version}...`, 33);

    this.setup();

  }

  initAPI() {
    if (CFG.ENABLE_API) {
      for (let key in _api) {
        this.on(key, _api[key]);
      };
    }
    // make sure we still have our print fn
    else {
      this.on("print", _api["print"]);
    }
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
    this.emit("print", msg, color, nl);
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

  /**
   * @param  {Request} req
   * @param  {Array} res
   * @return {Object}
   */
  decode(req, res) {

    // clone
    req = JSON.parse(JSON.stringify(req));
    res = JSON.parse(JSON.stringify(res));

    // dont decode unknown6, since it bloats the file size
    delete req.unknown6;

    // decode requests
    for (let request of req.requests) {
      let key = _toCC(request.request_type);
      let msg = request.request_message;
      if (msg) {
        let proto = `POGOProtos.Networking.Requests.Messages.${key}Message`;
        request.request_message = this.parseProtobuf(new Buffer(msg.data), proto);
      }
    };

    // decode responses
    let index = 0;
    for (let resp of res) {
      let key = _toCC(req.requests[index].request_type);
      let msg = new Buffer(resp);
      let proto = `POGOProtos.Networking.Responses.${key}Response`;
      res[index] = this.parseProtobuf(msg, proto);
      index++;
    };

    // clone again to build response out of it
    let req2 = JSON.parse(JSON.stringify(req));

    // build res base out of req
    delete req2.requests;
    req2.returns = res;
    req2.status_code = 1;

    return ({
      req: req,
      res: res
    });

  }

  dumpTraffic(req, res) {

    let decoded = this.decode(req, res);

    let out = {
      Request: decoded.req,
      Response: decoded.res
    };

    try {
      let decoded = JSON.stringify(out, null, 2);
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


((Server) => {

  const server = new Server();

  process.openStdin().addListener("data", (data) => {
    server.stdinInput(data);
  });

  process.on("uncaughtException", (data) => {
    server.uncaughtException(data);
  });

})(GameServer);