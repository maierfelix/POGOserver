import proto from "./proto";

import * as CFG from "../cfg";

import {
  getHashCodeFrom,
  decodeRequestEnvelope
} from "./utils";

/**
 * @class Player
 */
class Player {

  /** @constructor */
  constructor(obj) {

    this.uid = -1;

    this.name = null;

    this.email = null;

    this.position = {
      latitude: 0,
      longitude: 0,
      altitude: 0
    };

    this.exp = 0;

    this.stardust = 0;
    this.pokecoins = 0;

    this.avatar = null;
    this.badges = null;
    this.pokedex = null;
    this.inventory = null;

    this.response = obj.response;
    this.connection = obj.connection;

    this.timeout = obj.timeout;

    this.remotePort = obj.remotePort;
    this.remoteAddress = obj.remoteAddress;

    this.currentEncounter = null;

    this.loggedIn = obj.loggedIn || false;
    this.authenticated = false;

  }

  /**
   * @param {String} email
   */
  generateUid(email) {
    this.uid = getHashCodeFrom(String(email));
  }

  /**
   * @param {Request} req
   */
  updatePosition(req) {

    let data = decodeRequestEnvelope(req.request_message.buffer);

    this.latitude = data.latitude;
    this.longitude = data.longitude;
    //this.position.altitude = data.altitude;

    //console.log(`Updated position: ${data.latitude};${data.longitude}`);

  }

  get latitude() {
    return (this.position.latitude);
  }
  set latitude(lat) {
    this.position.latitude = lat;
  }

  get longitude() {
    return (this.position.longitude);
  }
  set longitude(lng) {
    this.position.longitude = lng;
  }

}

/**
 * @param {Player} player
 */
export function getPlayerIndex(player) {

  let ip = player.remoteAddress;
  let index = -1;

  let ii = 0, length = this.clients.length;

  for (; ii < length; ++ii) {
    if (this.clients[ii].remoteAddress === ip) {
      index = ii;
      break;
    }
  };

  return (index);

}

/**
 * @param {Request} req
 */
export function getPlayerByRequest(req) {
  return (
    this.getPlayerByIP(req.connection.remoteAddress)
  );
}

/**
 * @param {String} ip
 */
export function getPlayerByIP(ip) {

  let ii = 0, length = this.clients.length;

  for (; ii < length; ++ii) {
    if (this.clients[ii].remoteAddress === ip) {
      return (this.clients[ii]);
    }
  };

  return (null);

}

/**
 * @param {Request} connection
 */
export function addPlayer(connection) {

  this.clients.push(new Player({
    timeout: this.time,
    connection: connection,
    response: this.response,
    remotePort: connection.remotePort,
    remoteAddress: connection.remoteAddress
  }));

}

/**
 * @param {Player} player
 */
export function removePlayer(player) {

  let index = this.getPlayerIndex(player);

  if (index >= 0) {
    this.clients.splice(index, 1);
    this.print(`${player.remoteAddress} disconnected!`, 36);
  }
  else {
    this.print("Failed at removing player", 33);
  }

}

export function updatePlayers() {
  //this.print("Updating players");
  return void 0;
}

export function savePlayers() {
  this.print("Saving players into database..");
  return void 0;
}

/**
 * @param {Player} player
 */
export function savePlayer(player) {
  this.print(`${player.remoteAddress} saved into database`, 34);
  return void 0;
}