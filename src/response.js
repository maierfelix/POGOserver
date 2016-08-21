import proto from "./proto";

import CFG from "../cfg";

import {
  GetInventory,
  GetHatchedEggs,
  CheckAwardedBadges,
  DownloadSettings,
  DownloadRemoteConfigVersion,
  GetPlayerProfile,
  ItemTemplates,
  GetAssetDigest,
  GetDownloadUrls,
  GetMapObjects,
  SfidaActionLog,
  FortDetails,
  FortSearch,
  SetContactSettings,
  SetAvatar,
  MarkTutorialComplete,
  LevelUpRewards,
  Encounter,
  NicknamePokemon,
  UpgradePokemon,
  EvolvePokemon,
  SetFavoritePokemon,
  ClaimCodeName
} from "./packets";

import { _toCC } from "./utils";

const REQUEST = proto.Networking.Requests.RequestType;

/**
 * @param  {Player} player
 * @param  {Request} req
 * @return {Buffer}
 */
export function processResponse(player, req) {

  let buffer = null;

  let cc = _toCC(req.request_type);
  let msg = null;
  let proto = `POGOProtos.Networking.Requests.Messages.${cc}Message`;

  if (req.request_message) {
    try {
      msg = this.parseProtobuf(req.request_message, proto);
    } catch (e) {
      this.print(`Failed to parse ${cc}: ${e}`, 31);
    }
  }

  return new Promise((resolve) => {

    try {
      switch (req.request_type) {
        case "GET_PLAYER":
          this.forwardPlayer(player).then((res) => resolve(res));
          return void 0;
        break;
        case "GET_HATCHED_EGGS":
          buffer = GetHatchedEggs();
        break;
        case "GET_INVENTORY":
          buffer = GetInventory(msg);
        break;
        case "CHECK_AWARDED_BADGES":
          buffer = CheckAwardedBadges();
        break;
        case "DOWNLOAD_SETTINGS":
          buffer = DownloadSettings();
        break;
        case "DOWNLOAD_ITEM_TEMPLATES":
          buffer = ItemTemplates();
        break;
        case "DOWNLOAD_REMOTE_CONFIG_VERSION":
          buffer = DownloadRemoteConfigVersion(msg);
          break;
        case "GET_ASSET_DIGEST":
          buffer = GetAssetDigest(msg);
        break;
        case "GET_PLAYER_PROFILE":
          buffer = GetPlayerProfile();
        break;
        case "GET_MAP_OBJECTS":
          player.updatePosition(msg);
          buffer = GetMapObjects(player, msg);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case "GET_DOWNLOAD_URLS":
          GetDownloadUrls(this.asset, this.getLocalIPv4(), msg).then((res) => {
            resolve(res);
          });
          return void 0;
        break;
        case "SET_AVATAR":
          player.updateAvatar(msg);
          buffer = SetAvatar(player);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case "SFIDA_ACTION_LOG":
          buffer = SfidaActionLog();
        break;
        case "MARK_TUTORIAL_COMPLETE":
          buffer = MarkTutorialComplete(player);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case "CLAIM_CODENAME":
          buffer = ClaimCodeName(msg, player);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case "LEVEL_UP_REWARDS":
          buffer = LevelUpRewards();
        break;
        case "FORT_DETAILS":
          buffer = FortDetails(msg);
        break;
        case "FORT_SEARCH":
          buffer = FortSearch();
        break;
        case "SET_CONTACT_SETTINGS":
          player.updateContactSettings(msg);
          buffer = SetContactSettings(player);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case "ENCOUNTER":
          buffer = Encounter(msg);
        break;
        case "NICKNAME_POKEMON":
          buffer = NicknamePokemon(msg);
        break;
        case "UPGRADE_POKEMON":
          buffer = UpgradePokemon(msg);
        break;
        case "EVOLVE_POKEMON":
          buffer = EvolvePokemon(msg);
        break;
        case "SET_FAVORITE_POKEMON":
          buffer = SetFavoritePokemon(msg);
        break;
        default:
          this.print(`Unknown request: ${req.request_type}`, 31);
        break;
      };
    } catch (e) {
      this.print(`Response error: ${e}`, 31);
    };

    resolve(buffer);

  });

}