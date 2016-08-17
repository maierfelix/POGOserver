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
    this.username = "undefined";
 
    this.latitude = 0;
    this.longitude = 0;
    this.altitude = 0;

    this.send_marketing_emails = false;
    this.send_push_notifications = false;

    this.exp = 0;

    this.stardust = 0;
    this.pokecoins = 0;

    this.team = 0;

    this.skin = 0;
    this.hair = 0;
    this.shirt = 0;
    this.pants = 0;
    this.hat = 0;
    this.shoes = 0;
    this.eyes = 0;
    this.gender = 0;
    this.backpack = 0;

    this.tutorial_state = [32, 1, 3, 4, 7];

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
        if (key === "send_marketing_emails" || key === "send_push_notifications") {
          this[key] = !!obj[key];
        } else {
          this[key] = obj[key];
        }
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
    this.altitude = data.altitude;

  }

  updateAvatar(req) {

    let data = proto.Networking.Requests.Messages.SetAvatarMessage.decode(req.request_message.toBuffer()).player_avatar;

    if (!data) return void 0;

    this.skin = data.skin;
    this.hair = data.hair;
    this.shirt = data.shirt;
    this.pants = data.pants;
    this.hat = data.hat;
    this.shoes = data.shoes;
    this.eyes = data.eyes;
    this.gender = data.gender;
    this.backpack = data.backpack;

  }

  updateContactSettings(req) {

    let data = proto.Networking.Requests.Messages.SetContactSettingsMessage.decode(req.request_message.toBuffer()).contact_settings;

    if (!data) return void 0;

    this.send_marketing_emails = data.send_marketing_emails;
    this.send_push_notifications = data.send_push_notifications;

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
    this.getPlayerByIP(req.headers.host)
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
 * @param {String} name
 */
export function getPlayerByName(name) {

  let ii = 0, length = this.clients.length;

  for (; ii < length; ++ii) {
    if (this.clients[ii].username === name) {
      return (this.clients[ii]);
    }
  };

  return (null);

}

/**
 * @param {Request} req
 */
export function addPlayer(req) {

  let connection = req.connection;

  this.clients.push(new Player({
    timeout: this.time,
    connection: connection,
    response: this.response,
    remotePort: connection.remotePort,
    remoteAddress: req.headers.host
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

/**
 * @param {String} name
 */
export function kickPlayer(name) {

  if (
    name === null ||
    name === void 0 ||
    typeof name === "string" &&
    name.length <= 1
  ) {
    this.print(`Invalid player name!`, 31);
    return void 0;
  }

  let player = this.getPlayerByName(name);

  if (player !== null) {
    this.removePlayer(player);
    this.print(`Kicked ${name} from the server!`);
  }
  else this.print(`Failed to kick ${name} from the server!`, 31);

}

export function updatePlayers() {
  //this.print("Updating players");
}

export function saveAllPlayers() {
  for (let client of this.clients) {
    this.savePlayer(client);
  };
}

export function removeAllPlayers() {
  for (let client of this.clients) {
    this.removePlayer(client);
  };
}

/**
 * @param {Player} player
 */
export function savePlayer(player) {
  return new Promise((resolve) => {
    if (player.authenticated) {
      this.updateUser(player).then(resolve);
    }
  });
}

export function loginPlayer() {

  let buffer = null;
  let player = this.player;

  return new Promise((resolve) => {
    this.getUserByEmail(player.email).then((doc) => {
      player.updateByObject(doc);
      buffer = GetPlayer(player).encode();
      resolve(buffer);
    });
  });

}

export function forwardPlayer() {

  let player = this.player;

  return new Promise((resolve) => {
    this.getUserByEmail(player.email).then((doc) => {
      if (player.email.length) {
        this.print(`${player.email.replace("@gmail.com", "")} authenticated!`, 36);
      }
      if (doc) {
        this.loginPlayer().then((res) => {
          resolve(res);
        });
      }
      else {
        this.registerPlayer().then((res) => {
          resolve(res);
        });
      }
    });
  });

}

export function registerPlayer() {

  let player = this.player;

  return new Promise((resolve) => {
    this.createUser(player).then(() => {
      this.print(`${this.player.email.replace("@gmail.com", "")} registered!`, 36);
      player.tutorial_state = [];
      this.loginPlayer().then((res) => {
        resolve(res);
      });
    });
  });

}