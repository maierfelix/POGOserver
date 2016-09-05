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
  getCandyByDexNumber(dex) {
    return (
      this.candies[dex << 0] || null
    );
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
   * @return {String}
   */
  serialize() {
    return (
      JSON.stringify(this.candies)
    );
  }

  /**
   * @param {String} str
   */
  parseJSON(str) {
    this.candies = JSON.parse(str);
  }

}