import ENUM from "../../../enum";

/**
 * @class Bag
 */
export default class Bag {

  /**
   * @param {Player} player
   * @constructor
   */
  constructor(player) {

    this.player = player;

    this.poke_ball = 150;
    this.great_ball = 25;
    this.ultra_ball = 5;
    this.master_ball = 10;

    this.potion = 1;
    this.super_potion = 1;
    this.hyper_potion = 1;
    this.max_potion = 1;

    this.revive = 1;
    this.max_revive = 1;

    this.lucky_egg = 1;
    this.troy_disk = 1;

    this.incense_ordinary = 1;
    this.incense_spicy = 1;
    this.incense_cool = 1;
    this.incense_floral = 1;

    this.razz_berry = 1;
    this.bluk_berry = 1;
    this.nanab_berry = 1;
    this.wepar_berry = 1;
    this.pinap_berry = 1;

    this.incubator_basic = 1;
    this.incubator_basic_unlimited = 1;

    this.pokemon_storage_upgrade = 1;
    this.storage_upgrade = 1;

  }

  /**
   * @param {String} name
   * @return {Number}
   */
  getItemEnumId(name) {
    return (
      ENUM.getIdByName(ENUM.ITEMS, name)
    );
  }

  /**
   * @param {String} name
   * @return {String}
   */
  getItemName(name) {
    return (
      this.getItemEnumId("ITEM_" + name.toUpperCase())
    );
  }

  /**
   * @return {Array}
   */
  serialize() {
    let out = [];
    for (let key in this) {
      if (this.hasOwnProperty(key) && Number.isInteger(this[key])) {
        let itemId = this.getItemName(key);
        if (Number.isInteger(itemId) && this[key] > 0) {
          out.push({
            modified_timestamp_ms: +new Date() - 1e3,
            inventory_item_data: {
              item: {
                item_id: "ITEM_" + key.toUpperCase(),
                count: this[key] << 0
              }
            }
          });
        }
      }
    };
    return (out);
  }

  /**
   * @return {String}
   */
  querify() {
    let buffer = {};
    for (let key in this) {
      if (this.hasOwnProperty(key) && Number.isInteger(this[key])) {
        let itemId = this.getItemName(key);
        if (Number.isInteger(itemId)) {
          buffer[itemId] = this[key];
        }
      }
    };
    return (JSON.stringify(buffer));
  }

}