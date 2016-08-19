import proto from "./proto";

import CFG from "../cfg";

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

const REQUEST = proto.Networking.Requests.RequestType;

/**
 * @param  {Player} player
 * @param  {Request} req
 * @return {Buffer}
 */
export function processResponse(player, req) {

  let buffer = null;

  return new Promise((resolve) => {

    try {
      switch (req.request_type) {
        case REQUEST.GET_PLAYER:
          this.forwardPlayer(player).then((res) => resolve(res));
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
          buffer = DownloadSettings(req);
        break;
        case REQUEST.DOWNLOAD_ITEM_TEMPLATES:
          buffer = ItemTemplates();
        break;
        case REQUEST.DOWNLOAD_REMOTE_CONFIG_VERSION:
          buffer = DownloadRemoteConfigVersion(req);
          break;
        case REQUEST.GET_ASSET_DIGEST:
          buffer = GetAssetDigest(this.asset, req);
        break;
        case REQUEST.GET_PLAYER_PROFILE:
          buffer = GetPlayerProfile();
        break;
        case REQUEST.GET_MAP_OBJECTS:
          player.updatePosition(req);
          buffer = GetMapObjects(player, req);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case REQUEST.GET_DOWNLOAD_URLS:
          GetDownloadUrls(this.asset, req, this.generateDownloadUrlByAssetId).then((res) => {
            resolve(res);
          });
          return void 0;
        break;
        case REQUEST.SET_AVATAR:
          player.updateAvatar(req);
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
          buffer = ClaimCodeName(req, player);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case REQUEST.LEVEL_UP_REWARDS:
          buffer = LevelUpRewards();
        break;
        case REQUEST.FORT_DETAILS:
          buffer = FortDetails(req);
        break;
        case REQUEST.FORT_SEARCH:
          buffer = FortSearch();
        break;
        case REQUEST.SET_CONTACT_SETTINGS:
          player.updateContactSettings(req);
          buffer = SetContactSettings(player);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case REQUEST.ENCOUNTER:
          buffer = Encounter(req);
        break;
        case REQUEST.NICKNAME_POKEMON:
          buffer = NicknamePokemon(req);
        break;
        case REQUEST.UPGRADE_POKEMON:
          buffer = UpgradePokemon(req);
        break;
        case REQUEST.EVOLVE_POKEMON:
          buffer = EvolvePokemon(req);
        break;
        case REQUEST.SET_FAVORITE_POKEMON:
          buffer = SetFavoritePokemon(req);
        break;
        case REQUEST.CATCH_POKEMON:
          let data = proto.Networking.Requests.Messages.CatchPokemonMessage.decode(req.request_message.toBuffer());
          console.log(data);
        break;
        default:
          this.print(`Unknown request: ${this.getRequestType(req)}`, 31);
        break;
      };
    } catch (e) {
      console.log(e);
    };

    resolve(buffer);

  });

}