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

  }

  /**
   * @return {Array}
   */
  serialize() {
    let out = [];
    out.push({
      name: "POKECOIN",
      amount: this.player.info.pokecoin
    });
    out.push({
      name: "STARDUST",
      amount: this.player.info.stardust
    });
    return (out);
  }

}