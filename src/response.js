import POGOProtos from "pokemongo-protobuf";

import print from "./print";
import CFG from "../cfg";

import {
  _toCC
} from "./utils";

/**
 * @param {Request} req
 * @param {String} type
 * @return {Buffer}
 */
export function parseMessage(req, type) {
  let proto = `POGOProtos.Networking.Requests.Messages.${type}Message`;
  if (req.request_message) {
    try {
      return (this.parseProtobuf(req.request_message, proto));
    } catch (e) {
      print(`Failed to parse ${type}: ${e}`, 31);
    }
  }
  return void 0;
}

/**
 * @param  {Player} player
 * @param  {Request} req
 * @return {Buffer}
 */
export function processResponse(player, req) {

  let cc = _toCC(req.request_type);
  let msg = this.parseMessage(req, cc) || {};

  return new Promise((resolve) => {

    try {
      switch (req.request_type) {
        // Player
        case "SET_AVATAR":
        case "GET_PLAYER":
        case "GET_INVENTORY":
        case "RELEASE_POKEMON":
        case "UPGRADE_POKEMON":
        case "GET_ASSET_DIGEST":
        case "NICKNAME_POKEMON":
        case "GET_HATCHED_EGGS":
        case "LEVEL_UP_REWARDS":
        case "GET_PLAYER_PROFILE":
        case "CHECK_AWARDED_BADGES":
        case "SET_FAVORITE_POKEMON":
        case "RECYCLE_INVENTORY_ITEM":
          player.getPacket(req.request_type, msg).then((result) => {
            resolve(result);
          });
          return void 0;
        break;
        // Global
        case "ENCOUNTER":
        case "FORT_SEARCH":
        case "FORT_DETAILS":
        case "CATCH_POKEMON":
        case "GET_MAP_OBJECTS":
        case "CHECK_CHALLENGE":
        case "GET_DOWNLOAD_URLS":
        case "DOWNLOAD_SETTINGS":
        case "DOWNLOAD_REMOTE_CONFIG_VERSION":
        case "DOWNLOAD_ITEM_TEMPLATES":
          msg.player = player;
          player.world.getPacket(req.request_type, msg).then((result) => {
            resolve(result);
          });
          return void 0;
        break;
        default:
          print(`Unknown request: ${req.request_type}`, 31);
        break;
      };
    } catch (e) {
      print(`Response error: ${e}`, 31);
    };

  });

}