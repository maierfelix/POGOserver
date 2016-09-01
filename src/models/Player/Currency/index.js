/**
 * @class Currency
 */
export default class Currency {

  /** @constructor */
  constructor() {

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