import proto from "./proto";

import CFG from "../cfg";

import {
  getHashCodeFrom,
  decodeRequestEnvelope
} from "./utils";

import {
  ResponseEnvelope,
  ResponseEnvelopeAuth
} from "./packets";

import jwtDecode from "jwt-decode";

import { GetPlayer } from "./packets";

/**
 * @class Player
 */
class Player {

  /** @constructor */
  constructor(obj) {

    this.uid = -1;
    this.owner_id = -1;

    this.email = null;
    this.username = null;
 
    this.latitude = 0;
    this.longitude = 0;
    this.altitude = 0;

    this.send_marketing_emails = false;
    this.send_push_notifications = false;

    this.exp = 0;
    this.level = 0;

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

    this.items = {
      poke_ball: 0,
      great_ball: 0,
      ultra_ball: 0,
      master_ball: 0,
      potion: 0,
      super_potion: 0,
      hyper_potion: 0,
      max_potion: 0,
      revive: 0,
      max_revive: 0,
      lucky_egg: 0,
      incense_ordinary: 0,
      incense_spicy: 0,
      incense_cool: 0,
      incense_floral: 0,
      troy_disk: 0,
      razz_berry: 0,
      bluk_berry: 0,
      nanab_berry: 0,
      wepar_berry: 0,
      pinap_berry: 0,
      incubator_basic: 0,
      incubator_basic_unlimited: 0,
      pokemon_storage_upgrade: 0,
      storage_upgrade: 0
    };

    this.party = [];

    this.tutorial_state = [];

    this.badges = null;
    this.pokedex = null;
    this.inventory = null;

    this.isPTCAccount = false;
    this.isGoogleAccount = false;

    this.request = obj.request;
    // gets updated after each chunk end event
    this.response = null;
    this.connection = obj.connection;

    this.timeout = obj.timeout;

    this.remotePort = obj.remotePort;
    this.remoteAddress = obj.remoteAddress;

    this.currentEncounter = null;

    this.loggedIn = obj.loggedIn || false;
    this.authenticated = false;

    this.authentications = 0;

  }

  /**
   * @param {String} email
   */
  generateUid(email) {
    this.uid = getHashCodeFrom(String(email));
  }

  /**
   * @param {Buffer} buffer
   */
  sendResponse(buffer) {
    this.response.end(buffer);
  }

  /**
   * @param {Response} res
   */
  updateResponse(res) {
    this.response = res;
  }

  updateByObject(obj) {
    for (let key in obj) {
      if (this.hasOwnProperty(key)) {
        if (key === "send_marketing_emails" || key === "send_push_notifications") {
          this[key] = !!obj[key];
        }
        else {
          this[key] = obj[key];
        }
      }
      else if (key.substring(0, 5) === "item_") {
        let name = key.substring(5, key.length);
        this.items[name] = obj[key];
      }
      else if (key === "id") {
        this.owner_id = obj[key];
      }
    };
  }

  /**
   * @param {Object} obj
   */
  updatePosition(obj) {
    this.latitude = obj.latitude;
    this.longitude = obj.longitude;
  }

  updateAvatar(req) {

    let node = null;

    for (let key in req.player_avatar) {
      node = req.player_avatar[key];
      if (key === "gender") {
        this.gender = node === "FEMALE" ? 1 : 0;
      }
      else {
        if (this.hasOwnProperty(key)) {
          this[key] = node;
        }
      }
    };

  }

  updateContactSettings(req) {

    let data = proto.Networking.Requests.Messages.SetContactSettingsMessage.decode(req.request_message.toBuffer()).contact_settings;

    if (!data) return void 0;

    this.send_marketing_emails = data.send_marketing_emails;
    this.send_push_notifications = data.send_push_notifications;

  }

}

/**
 * @param {String} name
 * @return {Boolean}
 */
export function validPlayerName(name) {
  return !(
    name === null ||
    name === void 0 ||
    typeof name === "string" &&
    name.length <= 1
  );
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
 * @return {Player}
 */
export function addPlayer(req) {

  let connection = req.connection;

  let player = new Player({
    timeout: this.time,
    connection: connection,
    request: req,
    remotePort: connection.remotePort,
    remoteAddress: req.headers.host
  });

  this.clients.push(player);

  return (player);

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
 * @param {String} pkmn
 */
export function spawnPkmnAtPlayer(name, pkmn, amount) {

  if (!this.validPlayerName(name)) {
    this.print(`Invalid player name!`, 31);
    return void 0;
  }

  let spawn = null;
  let player = this.getPlayerByName(name);

  if (player !== null) {
    let index = 0;
    while (++index < amount) {
      spawn = {
        pokemon_id: pkmn.toUpperCase(),
        cp: Math.random() * 1e3 << 0,
        encounter_id: Math.random() * 1e5 << 0,
        latitude: player.latitude + parseFloat((Math.random() / 1e3).toFixed(5)),
        longitude: player.longitude + parseFloat((Math.random() / 1e3).toFixed(5))
      };
      this.wild_pokemons.push(spawn);
    };
    this.print(`Spawned ${amount}x ${pkmn}'s to ${name} at ${spawn.latitude.toFixed(7)}:${spawn.longitude.toFixed(7)}!`);
  }
  else this.print(`Failed to spawn ${pkmn} to player ${name}!`, 31);

}

/**
 * @param {String} name
 */
export function kickPlayer(name) {

  if (!this.validPlayerName(name)) {
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
      this.updateUser(player).then(() => {
        this.updateUserItems(player).then(resolve);
      });
    }
  });
}

/**
 * @param {Player} player
 */
export function forwardPlayer(player) {

  return new Promise((resolve) => {
    this.getUserByEmail(player.email).then((doc) => {
      if (player.email.length) {
        let provider = player.isGoogleAccount ? "Google" : "PTC";
        this.print(`${player.email.replace("@gmail.com", "")} authenticated via ${provider}!`, 36);
      }
      if (doc) {
        this.loginPlayer(player).then((res) => {
          resolve(res);
        });
      }
      else {
        this.registerPlayer(player).then((res) => {
          resolve(res);
        });
      }
    });
  });

}

/**
 * @param {Player} player
 */
export function loginPlayer(player) {

  return new Promise((resolve) => {
    this.getUserByEmail(player.email).then((user) => {
      user = user[0];
      this.getPkmnByColumn("owner_id", user.id).then((party) => {
        player.updateByObject(user);
        player.party = party || [];
        let buffer = GetPlayer(player);
        resolve(buffer);
      });
    });
  });

}

/**
 * @param {Player} player
 */
export function registerPlayer(player) {

  return new Promise((resolve) => {
    this.createUser(player).then(() => {
      this.print(`${player.email.replace("@gmail.com", "")} registered!`, 36);
      player.tutorial_state = [];
      this.loginPlayer(player).then((res) => {
        resolve(res);
      });
    });
  });

}

/**
 * @param {Player} player
 * @return {Buffer}
 */
export function authenticatePlayer(player) {

  let request = decodeRequestEnvelope(player.request.body);

  let msg = ResponseEnvelopeAuth({
    id: request.request_id
  });

  let token = request.auth_info;

  // TODO: Support PTC server authentification

  if (!token || !token.provider) {
    this.print("Invalid authentication token! Kicking..", 31);
    this.removePlayer(player);
    return void 0;
  }

  if (token.provider === "google") {
    if (token.token !== null) {
      let decoded = jwtDecode(token.token.contents);
      player.generateUid(decoded.email);
      player.email = decoded.email;
      player.email_verified = decoded.email_verified;
      player.isGoogleAccount = true;
      this.print(`${player.email.replace("@gmail.com", "")} connected!`, 36);
    }
    else {
      this.print("Invalid authentication token! Kicking..", 31);
      this.removePlayer(player);
      return void 0;
    }
  }
  else if (token.provider === "ptc") {
    let decoded = token.token.contents;
    player.isPTCAccount = true;
    player.email = decoded.split("-")[1];
    player.email_verified = true;
    player.isPTCAccount = true;
    //console.log(decoded);
    this.print("PTC auth isnt supported yet! Your progress wont get saved!", 33);
    //this.removePlayer(player);
    //return void 0;
  }
  else {
    this.print("Invalid provider! Kicking..", 31);
    this.removePlayer(player);
    return void 0;
  }

  player.authenticated = true;

  return (msg);

}
