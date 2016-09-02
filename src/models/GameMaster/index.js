import POGOProtos from "pokemongo-protobuf";

import {
  idToPkmnBundleName
} from "../../utils";

import ENUM from "../../enum";

/**
 * @class GameMaster
 */
export default class GameMaster {

  /**
   * @param {Object} decode
   * @constructor
   */
  constructor(decode) {

    this.settings = this.buildSettings();

    this.decode = decode;
    this.buffer = this.encode();

    this.parse();

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