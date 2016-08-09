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
  LevelUpRewards
} from "./packets";

/**
 * @param  {Request} req
 * @return {Buffer}
 */
export function processResponse(request) {

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
        buffer = SetAvatar(player);
        this.savePlayer(player);
      break;
      case REQUEST.SFIDA_ACTION_LOG:
        buffer = SfidaActionLog();
      break;
      case REQUEST.MARK_TUTORIAL_COMPLETE:
        buffer = MarkTutorialComplete(player);
        this.savePlayer(player);
      break;
      case REQUEST.LEVEL_UP_REWARDS:
        buffer = LevelUpRewards();
      break;
      case REQUEST.FORT_DETAILS:
        buffer = FortDetails();
      break;
      case REQUEST.FORT_SEARCH:
        buffer = FortSearch();
      break;
      case REQUEST.SET_CONTACT_SETTINGS:
        player.updateContactSettings(request);
        buffer = SetContactSettings(player);
        this.savePlayer(player);
      break;
      default:
        this.print(`Unknown request: ${this.getRequestType(request)}`, 31);
      break;
    };

    resolve(buffer);

  });

}