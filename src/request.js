import fs from "fs";
import proto from "./proto";

import * as CFG from "../cfg";
import { REQUEST } from "../requests";

import {
  ResponseEnvelope,
  ResponseEnvelopeAuth,
  AuthTicket,
  GetInventory,
  GetHatchedEggs,
  CheckAwardedBadges,
  DownloadSettings,
  DownloadRemoteConfigVersion,
  GetPlayer,
  GetPlayerProfile,
  ItemTemplates,
  GetAssetDigest,
  GetDownloadUrls,
  GetMapObjects
} from "./packets";

import { decodeRequestEnvelope } from "./utils";

import jwtDecode from "jwt-decode";

/**
 * @return {Buffer}
 */
export function authenticatePlayer() {

  let player = this.player;

  let request = decodeRequestEnvelope(this.getRequestBody());

  let msg = ResponseEnvelopeAuth({
    id: request.request_id
  });

  let token = request.auth_info;

  if (token.provider === "google") {
    let decoded = jwtDecode(token.token.contents);
    player.generateUid(decoded.email);
    player.email = decoded.email;
    player.email_verified = decoded.email_verified;
    this.print(`${player.email.replace("@gmail.com", "")} connected!`, 36);
  }

  player.authenticated = true;

  return (msg);

}

/**
 * @param  {Request} req
 * @return {String}
 */
export function getRequestType(req) {

  for (let key in REQUEST) {
    if (REQUEST[key] === req.request_type) {
      return (key);
    }
  };

  return ("INVALID");

}

/**
 * @param {Request} req
 * @param {Response} res
 */
export function onRequest(req, res) {

  this.player = this.getPlayerByRequest(req);
  this.player.response = res;

  let player = this.player;

  // Validate email verification
  if (player.authenticated) {
    if (!player.email_verified) {
      return void 0;
    }
  }

  let request = proto.Networking.Envelopes.RequestEnvelope.decode(req.body);

  console.log("#####");
  request.requests.map((request) => {
    console.log("Got request:", this.getRequestType(request));
  }).join(",");

  if (!player.authenticated) {
    this.send(this.authenticatePlayer());
    return void 0;
  }

  this.processRequests(request.requests).then((answer) => {
    let msg = this.envelopResponse(1, request.request_id, answer, request.hasOwnProperty("auth_ticket"), request.unknown6);
    this.send(msg);
  });

}

/**
 * @param  {Number} status
 * @param  {Long} id
 * @param  {Array} response
 * @param  {Boolean} auth
 * @param  {Array} unknown6
 * @return {Buffer}
 */
export function envelopResponse(status, id, response, auth, unknown6) {

  let answer = ResponseEnvelope({
    id: id,
    status: status,
    response: response
  });

  if (auth) answer.auth_ticket = AuthTicket();

  return (answer);

}

/**
 * @param  {Array} requests
 * @return {Array}
 */
export function processRequests(requests) {

  return new Promise((resolve) => {
    let ii = 0;
    let counter = 0;
    let length = requests.length;
    let body = [];
    for (; ii < length; ++ii) {
      this.processRequest(requests[ii]).then((request) => {
        counter++;
        body.push(request);
        if (counter >= length) resolve(body);
      });
    };
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

/**
 * @param {Object} doc
 */
export function loginPlayer(doc) {

  let buffer = null;
  let player = this.player;

  return new Promise((resolve) => {
    this.getUserByEmail(player.email).then((doc) => {
      player.updateByObject(doc[0]);
      buffer = GetPlayer(doc[0]).encode();
      resolve(buffer);
    });
  });

}

export function forwardPlayer() {

  let player = this.player;

  return new Promise((resolve) => {
    this.getUserByEmail(player.email).then((doc) => {
      doc = doc[0];
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
 * @param  {Request} req
 * @return {Buffer}
 */
export function processRequest(request) {

  let buffer = null;
  let player = this.player;

  return new Promise((resolve) => {

    switch (request.request_type) {
      case REQUEST.GET_PLAYER:
        this.forwardPlayer().then((res) => resolve(res));
        return void 0;
      break;
      case REQUEST.GET_HATCHED_EGGS:
        buffer = GetHatchedEggs();
      break;
      case REQUEST.GET_INVENTORY:
        buffer = GetInventory();
      break;
      case REQUEST.CHECK_AWARDED_BADGES:
        buffer = CheckAwardedBadges();
      break;
      case REQUEST.DOWNLOAD_SETTINGS:
        buffer = DownloadSettings();
      break;
      case REQUEST.DOWNLOAD_ITEM_TEMPLATES:
        buffer = ItemTemplates();
      break;
      case REQUEST.DOWNLOAD_REMOTE_CONFIG_VERSION:
        buffer = DownloadRemoteConfigVersion();
        break;
      case REQUEST.GET_ASSET_DIGEST:
        buffer = GetAssetDigest();
      break;
      case REQUEST.GET_PLAYER_PROFILE:
        buffer = GetPlayerProfile();
      break;
      case REQUEST.GET_MAP_OBJECTS:
        this.player.updatePosition(request);
        buffer = GetMapObjects(request);
        this.savePlayer(player);
      break;
      case REQUEST.GET_DOWNLOAD_URLS:
        buffer = GetDownloadUrls();
      break;
      case REQUEST.SET_AVATAR:
        player.updateAvatar(request);
        buffer = new proto.Networking.Responses.SetAvatarResponse({
          status: proto.Networking.Responses.SetAvatarResponse.Status.SUCCESS,
          player_data: GetPlayer({
            username: "TollNicht",
            team: 1,
            pokecoins: 1337,
            stardust: 1338,
            avatar: player.avatar
          }).player_data
        }).encode();
        this.savePlayer(player);
      break;
      case REQUEST.SFIDA_ACTION_LOG:
        buffer = new proto.Networking.Responses.SfidaActionLogResponse({
          result: proto.Networking.Responses.SfidaActionLogResponse.Result.SUCCESS,
          log_entries: [
            new proto.Data.Logs.ActionLogEntry({
              sfida: true,
              timestamp_ms: new Date().getTime() * 1000,
              catch_pokemon: new proto.Data.Logs.CatchPokemonLogEntry({
                result: 1,
                pokemon_id: proto.Enums.PokemonId.BULBASAUR,
                combat_points: 10,
                pokemon_data_id: 1
              }),
              fort_search: new proto.Data.Logs.FortSearchLogEntry({
                result: 1,
                fort_id: "roflcopter",
                eggs: 0,
                items: [
                  new proto.Inventory.Item.ItemData({
                    item_id: proto.Inventory.Item.ItemId.ITEM_POKE_BALL,
                    count: 1,
                    unseen: false
                  })
                ]
              })
            })
          ]
        }).encode();
      break;
      case REQUEST.MARK_TUTORIAL_COMPLETE:
        buffer = new proto.Networking.Respones.MarkTutorialCompleteResponse({
          success: true,
          player_data: GetPlayer({
            username: "TollNicht",
            team: 1,
            pokecoins: 1337,
            stardust: 1338,
            avatar: player.avatar
          }).player_data
        });
      break;
      case REQUEST.LEVEL_UP_REWARDS:
        buffer = new proto.Networking.Responses.LevelUpRewardsResponse({
          result: proto.Networking.Responses.LevelUpRewardsResponse.Result.SUCCESS,
          items_awarded: [],
          items_unlocked: []
        });
      break;
      default:
        this.print(`Unknown request: ${this.getRequestType(request)}`, 31);
      break;
    };

    resolve(buffer);

  });

}

/**
 * @param  {Request} req
 * @return {Boolean}
 */
export function validRequest(req) {
  return (true);
}

/**
 * @return {Buffer}
 */
export function getRequestBody() {
  return (
    this.request.body
  );
}

/**
 * @param {Buffer} buffer
 */
export function send(buffer) {

  this.player.response.end(buffer);

}