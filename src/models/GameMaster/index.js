import POGOProtos from "pokemongo-protobuf";

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

    let ii = 0;
    let length = 0;

    let item = null;
    let items = this.decode.item_templates;

    length = items.length;

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
   * @return {Buffer}
   */
  serialize() {
    return (
      this.buffer
    );
  }

}