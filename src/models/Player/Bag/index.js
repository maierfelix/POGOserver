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

    this.poke_ball = 0;
    this.great_ball = 0;
    this.ultra_ball = 0;
    this.master_ball = 0;

    this.potion = 0;
    this.super_potion = 0;
    this.hyper_potion = 0;
    this.max_potion = 0;

    this.revive = 0;
    this.max_revive = 0;

    this.lucky_egg = 0;
    this.troy_disk = 0;

    this.incense_ordinary = 0;
    this.incense_spicy = 0;
    this.incense_cool = 0;
    this.incense_floral = 0;

    this.razz_berry = 0;
    this.bluk_berry = 0;
    this.nanab_berry = 0;
    this.wepar_berry = 0;
    this.pinap_berry = 0;

    this.incubator_basic = 0;
    this.incubator_basic_unlimited = 0;

    this.pokemon_storage_upgrade = 0;
    this.storage_upgrade = 0;

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
   * @param {Number} id
   * @return {String}
   */
  getItemEnumName(id) {
    return (
      ENUM.getNameById(ENUM.ITEMS, id)
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
   * @param {String} key
   * @return {String}
   */
  getLocalItemKey(key) {
    return (
      key.replace("ITEM_", "").toLowerCase()
    );
  }

  /**
   * @param {String} key
   * @return {Number}
   */
  getItemAmountByItemKey(key) {
    let name = this.getLocalItemKey(key);
    if (this.hasOwnProperty(name)) {
      return (this[name]);
    }
    return (-1);
  }

  /**
   * @param {String} name
   * @return {Boolean}
   */
  isValidItemKey(name) {
    return (
      this.hasOwnProperty(name) && Number.isInteger(this[name])
    );
  }

  /**
   * @param {String} name
   * @param {Number} amount
   * @return {Number}
   */
  updateItem(name, amount) {
    let key = this.getLocalItemKey(name);
    if (!this.isValidItemKey(key)) return (-1);
    let currentAmount = this[key] << 0;
    if (amount < 0) {
      if (currentAmount + amount < 0) this[key] = 0;
      else this[key] += amount;
    }
    else {
      this[key] += amount;
    }
    return (this[key]);
  }

  /**
   * @return {Array}
   */
  serialize() {
    let out = [];
    for (let key in this) {
      if (this.isValidItemKey(key)) {
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
      if (this.isValidItemKey(key)) {
        let itemId = this.getItemName(key);
        if (Number.isInteger(itemId)) {
          buffer[itemId] = this[key];
        }
      }
    };
    return (JSON.stringify(buffer));
  }

  /**
   * @param {String} str
   */
  parseJSON(str) {
    let obj = JSON.parse(str);
    for (let key in obj) {
      let name = this.getItemEnumName(key).toLowerCase().replace("item_", "");
      if (this.isValidItemKey(name)) {
        this[name] = obj[key];
      }
    };
  }

}