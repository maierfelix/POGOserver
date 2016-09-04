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

    this.candies = [];

  }

  /**
   * @param {Number} dex
   * @return {Object}
   */
  getCandyByDexNumber(dex) {

    let candies = this.candies;

    let ii = 0;
    let length = candies.length;

    for (; ii < length; ++ii) {
      if (candies[ii].dex === dex) {
        return (candies[ii]);
      }
    };

    return (null);

  }

  /**
   * @param {Number} dex
   * @return {Number}
   */
  getCandy(dex) {
    return (
      this.getCandyByDexNumber(dex) || 0
    );
  }

  /**
   * @param {Number} dex
   * @param {Number} amount
   */
  addCandy(dex, amount) {
    let candy = this.getCandyByDexNumber(dex);
    candy.amount += amount << 0;
  }

  /**
   * @param {Number} dex
   * @param {Number} amount
   */
  removeCandy(dex, amount) {
    let candy = this.getCandyByDexNumber(dex);
    candy.amount -= amount << 0;
    if (candy.amount < 0) candy.amount = 0;
  }

  /**
   * @param {String} str
   */
  parseCandies(str) {

    let result = null;

    let seperator = ":";
    let split = str.split(",");

    let ii = 0;
    let length = split.length;

    for (; ii < length; ++ii) {
      result = split[ii].split(seperator);
      this.candies.push({
        dex: result[0] << 0,
        amount: result[1] << 0
      });
    };

  }

  /**
   * @return {String}
   */
  serialize() {

    let str = "";
    let candies = this.candies;

    let ii = 0;
    let length = candies.length;

    for (; ii < length; ++ii) {
      str += candies[ii].dex + ":" + candies[ii].dex;
      if (ii + 1 < length) str += ",";
    };

    return (str);

  }

}