import Player from "../Player";

import CFG from "../../../cfg";

import print from "../../print";

/**
 * @return {Boolean}
 */
export function isFull() {
  return (
    this.connectedPlayers >= CFG.MAX_CONNECTIONS
  );
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export function getPlayerByRequest(req, res) {

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
export function playerAlreadyConnected(req) {

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
export function getPlayerByIP(ip) {

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
 * @param {String} email
 */
export function playerIsRegistered(email) {
  return new Promise((resolve) => {
    this.db.query(`SELECT * FROM ${CFG.MYSQL_USERS_TABLE} WHERE email=?`, [email], (e, rows) => {
      if (e) return print(e, 31);
      resolve(rows.length >= 1);
    });
  });
}

/**
 * @param {Player} player
 */
export function registerPlayer(player) {
  return new Promise((resolve) => {
    this.db.query(`INSERT INTO ${CFG.MYSQL_USERS_TABLE} SET email=? `, [player.email], (e, res) => {
      if (e) return this.print(e, 31);
      resolve();
    });
  });
}

/**
 * @param {Request} req
 * @param {Response} res
 * @return {Player}
 */
export function addPlayer(req, res) {

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
export function removePlayer(player) {
  console.log("Remove:", player.email);
}