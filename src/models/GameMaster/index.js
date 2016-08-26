/**
 * @class GameMaster
 */
export default class GameMaster {

  /**
   * @param {Buffer} buffer
   * @constructor
   */
  constructor(buffer) {

    this.settings = this.buildSettings();

    this.buffer = buffer;

    this.parse();

  }

  parse() {

    let ii = 0;
    let length = 0;

    let item = null;
    let items = this.buffer.item_templates;

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

}