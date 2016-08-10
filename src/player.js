import proto from "./proto";

import * as CFG from "../cfg";

import {
  getHashCodeFrom,
  decodeRequestEnvelope
} from "./utils";

import { GetPlayer } from "./packets";

/**
 * @class Player
 */
class Player {

  /** @constructor */
  constructor(obj) {

    this.uid = -1;

    this.email = null;
    this._username = "Administrator";
 
    this.position = {
      latitude: 0,
      longitude: 0,
      altitude: 0
    };

    this.contact_settings = {
      send_marketing_emails: false,
      send_push_notifications: false
    };

    this.exp = 0;

    this.stardust = 1337;
    this.pokecoins = 1338;

    this.avatar = {
      skin: 0,
      hair: 2,
      shirt: 1,
      pants: 2,
      hat: 0,
      shoes: 2,
      eyes: 3,
      gender: proto.Enums.Gender.MALE,
      backpack: 1
    };

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

  updateByObject(obj) {

    for (let key in obj) {
      if (this.hasOwnProperty(key)) {
        this[key] = obj[key];
      }
    };

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

  updateAvatar(req) {

    let data = proto.Networking.Requests.Messages.SetAvatarMessage.decode(req.request_message.toBuffer()).player_avatar;

    if (!data) return void 0;

    this.avatar = {
      skin: data.skin,
      hair: data.hair,
      shirt: data.shirt,
      pants: data.pants,
      hat: data.hat,
      shoes: data.shoes,
      eyes: data.eyes,
      gender: data.gender,
      backpack: data.backpack
    };

  }

  updateContactSettings(req) {

    let data = proto.Networking.Requests.Messages.SetContactSettingsMessage.decode(req.request_message.toBuffer()).contact_settings;

    if (!data) return void 0;

    this.contact_settings.send_marketing_emails = data.send_marketing_emails;
    this.contact_settings.send_push_notifications = data.send_push_notifications;

  }

  get username() {
    return (this._username);
  }
  set username(name) {
    this._username = name;
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
  for (let client of this.clients) {
    this.savePlayer(client);
  };
  this.print("Saved players into database");
  return void 0;
}

/**
 * @param {Player} player
 */
export function savePlayer(player) {
  if (player.authenticated) {
    this.updateUser(player);
  }
  //this.print(`${player.remoteAddress} saved into database`, 34);
}

/**
 * @param {Object} doc
 */
export function loginPlayer(doc) {

  let buffer = null;
  let player = this.player;

  return new Promise((resolve) => {
    this.getUserByEmail(player.email).then((doc) => {
      player.updateByObject(doc);
      buffer = GetPlayer(doc).encode();
      resolve(buffer);
    });
  });

}

export function forwardPlayer() {

  let player = this.player;

  return new Promise((resolve) => {
    this.getUserByEmail(player.email).then((doc) => {
      if (doc === void 0) {
        this.registerPlayer(doc).then((res) => {
          resolve(res);
        });
      }
      else {
        this.loginPlayer(doc).then((res) => {
          resolve(res);
        });
      }
    });
  });

}

/**
 * @param {Object} doc
 */
export function registerPlayer(doc) {

  let player = this.player;

  return new Promise((resolve) => {
    this.createUser(player).then(() => {
      this.print(`${this.player.email.replace("@gmail.com", "")} registered!`, 36);
      this.loginPlayer(doc).then((res) => {
        resolve(res);
      });
    });
  });

}