import proto from "./proto";
import POGOProtos from "pokemongo-protobuf";

import CFG from "../cfg";

import {
  GetInventory,
  GetHatchedEggs,
  CheckAwardedBadges,
  DownloadSettings,
  DownloadRemoteConfigVersion,
  GetPlayerProfile,
  ItemTemplates,
  GetPlayer,
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
  CatchPokemon,
  NicknamePokemon,
  UpgradePokemon,
  EvolvePokemon,
  SetFavoritePokemon,
  ClaimCodeName,
  CheckChallenge
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
          player.authentications++;
          if (player.authentications >= 2) {
            buffer = GetPlayer(player);
            resolve(buffer);
            return void 0;
          }
          this.forwardPlayer(player).then((res) => resolve(res));
          return void 0;
        break;
        case "CHECK_CHALLENGE":
          buffer = CheckChallenge();
        break;
        case "GET_HATCHED_EGGS":
          buffer = GetHatchedEggs();
        break;
        case "GET_INVENTORY":
          buffer = GetInventory(player);
        break;
        case "CHECK_AWARDED_BADGES":
          buffer = CheckAwardedBadges();
        break;
        case "DOWNLOAD_SETTINGS":
          buffer = DownloadSettings();
        break;
        case "DOWNLOAD_ITEM_TEMPLATES":
          buffer = ItemTemplates(this.master);
        break;
        case "DOWNLOAD_REMOTE_CONFIG_VERSION":
          buffer = DownloadRemoteConfigVersion(msg);
          break;
        case "GET_ASSET_DIGEST":
          buffer = GetAssetDigest(player);
        break;
        case "GET_PLAYER_PROFILE":
          buffer = GetPlayerProfile();
        break;
        case "GET_MAP_OBJECTS":
          player.updatePosition(msg);
          buffer = GetMapObjects(player, this.wild_pokemons, msg);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case "GET_DOWNLOAD_URLS":
          GetDownloadUrls(player.asset_digest.decode, CFG.LOCAL_IP || this.getLocalIPv4(), msg).then((res) => {
            resolve(res);
          });
          return void 0;
        break;
        case "SET_AVATAR":
          player.updateAvatar(msg);
          this.emit("updatePlayerAvatar", player);
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
          buffer = MarkTutorialComplete(player, msg);
          this.savePlayer(player).then(() => {
            resolve(buffer);
          });
          return void 0;
        break;
        case "ENCOUNTER_TUTORIAL_COMPLETE":
          let starters = ["BULBASAUR", "CHARMANDER", "SQUIRTLE"];
          // Make sure the catched pokemon is valid
          if (starters.indexOf(msg.pokemon_id) === -1) {
            if (player.tutorial_state.indexOf("POKEMON_CAPTURE") === -1) {
              player.tutorial_state.push("POKEMON_CAPTURE");
            }
            let pkmn = {
              pokemon_id: msg.pokemon_id,
              cp: 15,
              stamina: 10,
              stamina_max: 10,
              move_1: "TACKLE",
              move_2: "TACKLE",
              height_m: 0.20962005257606506,
              weight_kg: 0.3212273120880127,
              individual_attack: 7,
              individual_defense: 7,
              individual_stamina: 3,
              cp_multiplier: 0.16639786958694458
            };
            player.party.push(pkmn);
            buffer = POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.EncounterTutorialCompleteResponse");
          }
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
          buffer = FortSearch(player);
          this.updateUserItems(player).then(() => {
            resolve(buffer);
          });
          return void 0;
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
          buffer = Encounter(this.getEncounterPkmn(msg).pkmn, msg);
        break;
        case "CATCH_POKEMON":
          let encounter = this.getEncounterPkmn(msg);
          let result = CatchPokemon(encounter.pkmn, player, msg);
          // save pkmn into player party
          if (result.status !== "CATCH_MISSED") {
            result.pkmn.owner_id = player.owner_id;
            player.exp += 100;
            player.stardust += 100;
            this.wild_pokemons.splice(encounter.index, 1);
            this.createOwnedPokemon(result.pkmn).then(() => {
              // make sure it got saved, also get db id
              this.getQueryByColumnFromTable("creation_time_ms", result.pkmn.creation_time_ms, CFG.MYSQL_OWNED_PKMN_TABLE).then((query) => {
                player.party.push(query[0]);
                result.buffer.captured_pokemon_id = query[0].id;
                result = POGOProtos.serialize(result.buffer, "POGOProtos.Networking.Responses.CatchPokemonResponse");
                resolve(result);
              });
            });
          }
          else {
            resolve(POGOProtos.serialize(result, "POGOProtos.Networking.Responses.CatchPokemonResponse"));
          }
          return void 0;
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
          buffer = SetFavoritePokemon(player, msg);
        break;
        case "RELEASE_POKEMON":
          buffer = {
            result: "SUCCESS",
            candy_awarded: 5
          };
          let id = msg.pokemon_id << 0;
          this.deleteOwnedPokemon(id).then(() => {
            player.deletePkmnFromParty(id);
            buffer = POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.ReleasePokemonResponse");
            resolve(buffer);
          });
          return void 0;
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

export function getEncounterPkmn(req) {

  let ii = 0;
  let length = this.wild_pokemons.length;

  let pkmn = null;

  for (; ii < length; ++ii) {
    pkmn = this.wild_pokemons[ii];
    if (pkmn.encounter_id === parseInt(req.encounter_id)) {
      break;
    }
  };

  return ({
    pkmn: pkmn,
    index: ii
  });

}