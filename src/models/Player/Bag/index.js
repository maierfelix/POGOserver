/**
 * @class Bag
 */
export default class Bag {

  /** @constructor */
  constructor() {

    //this.candies = new CandyBag();

    this.stardust = 0;
    this.pokecoins = 0;

    this.pokeBall = 0;
    this.greatBall = 0;
    this.ultraBall = 0;
    this.masterBall = 0;

    this.potion = 0;
    this.superPotion = 0;
    this.hyperPotion = 0;
    this.maxPotion = 0;

    this.revive = 0;
    this.maxRevive = 0;

    this.razzBerry = 0;
    this.blukBerry = 0;
    this.nanabBerry = 0;
    this.weparBerry = 0;
    this.pinapBerry = 0;

    // premium shit
    this.luckyEgg = 0;
    this.troyDisk = 0;

    this.incenseOrdinary = 0;
    this.incenseSpicy = 0;
    this.incenseCool = 0;
    this.incenseFloral = 0;

    this.incubatorBasic = 0;
    this.incubatorBasicUnlimited = 0;

    this.storageUpgrade = 0;

    this.pkmnStorageUpgrade = 0;

  }

  /**
   * @param {Number} dex
   * @return {Object}
   */
  getCandy(dex) {
    return (
      this.candies.getCandyByDexNumber(dex)
    );
  }

  /**
   * @param {Number} dex
   * @param {Number} value
   */
  updateCandyAmount(dex, value) {
    let candy = this.getCandy(dex);
    candy.amount += (value << 0);
  }

}