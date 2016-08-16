import proto from "./proto";

import * as CFG from "../cfg";
import { REQUEST } from "./requests";

import {
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

/**
 * @param  {Request} req
 * @return {Buffer}
 */
export function processResponse(request) {

  let buffer = null;
  let player = this.player;

  return new Promise((resolve) => {

    try {
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
          buffer = GetAssetDigest(request);
        break;
        case REQUEST.GET_PLAYER_PROFILE:
          buffer = GetPlayerProfile();
        break;
        case REQUEST.GET_MAP_OBJECTS:
          this.player.updatePosition(request);
          buffer = GetMapObjects(request);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case REQUEST.GET_DOWNLOAD_URLS:
          GetDownloadUrls(request, this.generateDownloadUrlByAssetId).then((res) => {
            resolve(res);
          });
          return void 0;
        break;
        case REQUEST.SET_AVATAR:
          player.updateAvatar(request);
          buffer = SetAvatar(player);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case REQUEST.SFIDA_ACTION_LOG:
          buffer = SfidaActionLog();
        break;
        case REQUEST.MARK_TUTORIAL_COMPLETE:
          buffer = MarkTutorialComplete(player);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case REQUEST.CLAIM_CODENAME:
          buffer = ClaimCodeName(request, player);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case REQUEST.LEVEL_UP_REWARDS:
          buffer = LevelUpRewards();
        break;
        case REQUEST.FORT_DETAILS:
          buffer = FortDetails(request);
        break;
        case REQUEST.FORT_SEARCH:
          buffer = FortSearch();
        break;
        case REQUEST.SET_CONTACT_SETTINGS:
          player.updateContactSettings(request);
          buffer = SetContactSettings(player);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case REQUEST.ENCOUNTER:
          buffer = Encounter(request);
        break;
        case REQUEST.NICKNAME_POKEMON:
          buffer = NicknamePokemon(request);
        break;
        case REQUEST.UPGRADE_POKEMON:
          buffer = UpgradePokemon(request);
        break;
        case REQUEST.EVOLVE_POKEMON:
          buffer = EvolvePokemon(request);
        break;
        case REQUEST.SET_FAVORITE_POKEMON:
          buffer = SetFavoritePokemon(request);
        break;
        case REQUEST.CATCH_POKEMON:
          let data = proto.Networking.Requests.Messages.CatchPokemonMessage.decode(request.request_message.toBuffer());
          console.log(data);
        break;
        default:
          this.print(`Unknown request: ${this.getRequestType(request)}`, 31);
        break;
      };
    } catch (e) {
      console.log(e);
    };

    resolve(buffer);

  });

}