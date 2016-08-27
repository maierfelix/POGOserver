import Player from "../Player";

import CFG from "../../../cfg";

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

  /**
   * @return {Boolean}
   */
  isFull() {
    return (
      this.players.length >= CFG.MAX_CONNECTIONS
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
      this.addPlayer(req, res);
      return (player);
    }

  }

  /**
   * @param  {Object} client
   * @return {Boolean}
   */
  playerAlreadyConnected(client) {

    let players = this.players;

    let ii = 0;
    let length = players.length;

    let remoteAddress = client.headers.host;

    for (; ii < length; ++ii) {
      if (players[ii].remoteAddress === remoteAddress) {
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
    let length = players.length;

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
   */
  addPlayer(req, res) {

    let player = new Player({
      request: req,
      response: res
    });

    this.players.push(player);

  }

  /**
   * @param {Player} player
   */
  removePlayer(player) {
    console.log(player);
  }

  spawnFort() {

  }

  spawnGym() {
    
  }

  spawnEncounter() {
    
  }

}