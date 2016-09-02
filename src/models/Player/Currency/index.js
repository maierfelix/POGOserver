/**
 * @class Currency
 */
export default class Currency {

  /**
   * @param {Player} player
   * @constructor
   */
  constructor(player) {

    this.player = player;

    this.currencies = {
      "POKECOIN": 0,
      "STARDUST": 0
    };

  }

  /**
   * @return {Array}
   */
  serialize() {
    let out = [];
    for (let key in this.currencies) {
      out.push({
        name: key,
        amount: this.currencies[key]
      });
    };
    return (out);
  }

}