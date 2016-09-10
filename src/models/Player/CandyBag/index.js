import { GAME_MASTER } from "../../../shared";

import ENUM from "../../../enum";

/**
 * @class CandyBag
 */
export default class CandyBag {

  /**
   * @param {Player} player
   * @constructor
   */
  constructor(player) {

    this.player = player;

    this.candies = {};

  }

  /**
   * @param {Number} dex
   * @return {Object}
   */
  getPkmnTemplate(dex) {
    let tmpl = GAME_MASTER.getPokemonTmplByDex(dex);
    return (tmpl);
  }

  /**
   * @param {Number} dex
   * @return {String}
   */
  getPkmnFamily(dex) {
    return (
      this.getPkmnTemplate(dex).family_id
    );
  }

  /**
   * @param {Number} dex
   * @return {Object}
   */
  createCandy(dex) {
    let id = ENUM.getIdByName(ENUM.POKEMON_FAMILY, this.getPkmnFamily(dex << 0));
    let candy = {
      amount: 0
    };
    this.candies[id] = candy;
    return (candy);
  }

  /**
   * @param {Number} dex
   * @return {Object}
   */
  getCandyByDexNumber(dex) {
    let id = ENUM.getIdByName(ENUM.POKEMON_FAMILY, this.getPkmnFamily(dex << 0));
    if (this.candies[id] !== void 0) {
      return (this.candies[id]);
    }
    else {
      return (this.createCandy(id) || null);
    }
  }

  /**
   * @param {Number} dex
   * @return {Number}
   */
  getCandy(dex) {
    return (
      this.getCandyByDexNumber(dex)
    );
  }

  /**
   * @param {Number} dex
   * @param {Number} amount
   */
  addCandy(dex, amount) {
    let candy = this.getCandyByDexNumber(dex);
    candy.amount += parseInt(amount);
  }

  /**
   * @param {Number} dex
   * @param {Number} amount
   */
  removeCandy(dex, amount) {
    let candy = this.getCandyByDexNumber(dex);
    candy.amount -= parseInt(amount);
    if (candy.amount < 0) candy.amount = 0;
  }

  /**
   * @return {Array}
   */
  serialize() {
    let out = [];
    for (let key in this.candies) {
      let candy = this.candies[key];
      if (!(candy.amount > 0)) continue;
      out.push({
        modified_timestamp_ms: +new Date() - 1e3,
        inventory_item_data: {
          candy: {
            family_id: this.getPkmnFamily(key << 0),
            candy: candy.amount
          }
        }
      });
    };
    return (out);
  }

  /**
   * @param {String} str
   */
  parseJSON(str) {
    let candies = JSON.parse(str);
    for (let candy in candies) {
      this.createCandy(candy).amount = parseInt(candies[candy]);
    };
  }

}