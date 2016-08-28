import Player from "../Player";

import CFG from "../../../cfg";

import * as _packets from "./packets";

import { inherit } from "../../utils";

/**
 * @class World
 */
export default class World {

  /** @constructor */
  constructor(instance) {

    this.instance = instance;

    this.db = this.instance.db;

    this.players = [];

  }

  get connectedPlayers() {
    return (this.players.length);
  }

  /**
   * @return {Boolean}
   */
  isFull() {
    return (
      this.connectedPlayers >= CFG.MAX_CONNECTIONS
    );
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  getPlayerByRequest(req, res) {

    let player = null;

    if (this.playerAlreadyConnected(req)) {
      player = this.getPlayerByIP(req.headers.host);
      return (player);
    }
    else {
      player = this.addPlayer(req, res);
      return (player);
    }

  }

  /**
   * @param {Request} req
   * @return {Boolean}
   */
  playerAlreadyConnected(req) {

    let ii = 0;
    let length = this.connectedPlayers;

    let remoteAddress = req.headers.host;

    for (; ii < length; ++ii) {
      if (this.players[ii].remoteAddress === remoteAddress) {
        return (true);
      }
    };

    return (false);

  }

  /**
   * @param {String} ip
   */
  getPlayerByIP(ip) {

    let players = this.players;

    let ii = 0;
    let length = this.connectedPlayers;

    for (; ii < length; ++ii) {
      if (players[ii].remoteAddress === ip) {
        return (players[ii]);
      }
    };

    return (null);

  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @return {Player}
   */
  addPlayer(req, res) {

    let player = new Player({
      world: this,
      request: req,
      response: res
    });

    player.remoteAddress = req.headers.host;

    this.players.push(player);

    return (player);

  }

  /**
   * @param {Player} player
   */
  removePlayer(player) {
    console.log("Remove:", player.email);
  }

  spawnFort() {

  }

  spawnGym() {
    
  }

  spawnEncounter() {
    
  }

  /**
   * @param {String} type
   * @param {Object} msg
   */
  getPacket(type, msg) {
    return new Promise((resolve) => {
      switch (type) {
        case "GET_MAP_OBJECTS":
          resolve(this.GetMapObjects(msg));
        break;
        case "CHECK_CHALLENGE":
          resolve(this.CheckChallenge(msg));
        break;
        case "DOWNLOAD_SETTINGS":
          resolve(this.DownloadSettings(msg));
        break;
        case "DOWNLOAD_REMOTE_CONFIG_VERSION":
          resolve(this.DownloadRemoteConfigVersion(msg));
        break;
        case "DOWNLOAD_ITEM_TEMPLATES":
          resolve(this.DownloadItemTemplates(msg));
        break;
      };
    });
  }

}

inherit(World, _packets);