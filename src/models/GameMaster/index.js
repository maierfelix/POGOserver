import fs from "fs";
import POGOProtos from "pokemongo-protobuf";

import {
  idToPkmnBundleName
} from "../../utils";

import CFG from "../../../cfg";
import ENUM from "../../enum";

import print from "../../print";

/**
 * @class GameMaster
 */
export default class GameMaster {

  /**
   * @param {GameServer} instance
   * @constructor
   */
  constructor(instance) {

    this.instance = instance;

    this.settings = this.buildSettings();

    this.decode = this.parse();
    this.buffer = this.encode();

    this.parseItemTemplates();

  }

  /**
   * @return {Buffer}
   */
  encode() {
    return (
      POGOProtos.serialize(this.decode, "POGOProtos.Networking.Responses.DownloadItemTemplatesResponse")
    );
  }

  parse() {
    let master = null;
    try {
      let data = fs.readFileSync(CFG.DUMP_ASSET_PATH + "game_master");
      master = this.instance.parseProtobuf(data, "POGOProtos.Networking.Responses.DownloadItemTemplatesResponse");
    } catch (e) {
      print(e, 31);
    }
    return (master);
  }

  parseItemTemplates() {

    let item = null;
    let items = this.decode.item_templates;

    let ii = 0;
    let length = items.length;

    for (; ii < length; ++ii) {
      item = items[ii];
      this.parseKey(item, item.template_id);
    };

  }

  /**
   * @param {Object} item
   * @param {String} key
   */
  parseKey(item, key) {
    if (key in this.settings) {
      this.settings[key] = item;
    }
  }

  /**
   * @return {Object}
   */
  buildSettings() {
    let settings = {
      "PLAYER_LEVEL_SETTINGS": null
    };
    return (settings);
  }

  getPlayerSettings() {
    return (
      this.settings["PLAYER_LEVEL_SETTINGS"].player_level
    );
  }

  /**
   * @param {Number} dex
   * @return {Object}
   */
  getPokemonTmplByDex(dex) {

    let id = idToPkmnBundleName(dex).substring(2);
    let name = ENUM.getNameById(ENUM.POKEMON_IDS, dex);
    let tmplId = `V${id}_POKEMON_${name}`;

    let item = null;
    let items = this.decode.item_templates;

    let ii = 0;
    let length = items.length;

    for (; ii < length; ++ii) {
      item = items[ii];
      if (
        item.pokemon_settings !== void 0 &&
        item.template_id === tmplId
      ) {
        return (item.pokemon_settings);
      }
    };

    return (null);

  }

  /**
   * @return {Buffer}
   */
  serialize() {
    return (
      this.buffer
    );
  }

}