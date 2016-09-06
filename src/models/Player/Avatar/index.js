/**
 * @class Avatar
 */
export default class Avatar {

  /**
   * @param {Player} player
   * @constructor
   */
  constructor(player) {

    this.player = player;

    this._skin = 0;
    this._hair = 0;
    this._shirt = 0;
    this._pants = 0;
    this._hat = 0;
    this._shoes = 0;
    this._eyes = 0;
    this._backpack = 0;
    this._gender = 0;

  }

  /**
   * @param  {Number} value
   * @param  {Number} a
   * @param  {Number} b
   * @return {Boolean}
   */
  between(value, a, b) {
    return (
      value >= a && value <= b
    );
  }

  // skin
  get skin() {
    return (this._skin);
  }
  set skin(value) {
    if (this.between(value, 0, 3)) {
      this._skin = value;
    }
  }

  // hair
  get hair() {
    return (this._hair);
  }
  set hair(value) {
    if (this.between(value, 0, 5)) {
      this._hair = value;
    }
  }

  // shirt
  get shirt() {
    return (this._shirt);
  }
  set shirt(value) {
    if (this.between(value, 0, 9)) {
      this._shirt = value;
    }
  }

  // pants
  get pants() {
    return (this._pants);
  }
  set pants(value) {
    if (this.between(value, 0, 5)) {
      this._pants = value;
    }
  }

  // hat
  get hat() {
    return (this._hat);
  }
  set hat(value) {
    if (this.between(value, 0, 4)) {
      this._hat = value;
    }
  }

  // shoes
  get shoes() {
    return (this._shoes);
  }
  set shoes(value) {
    if (this.between(value, 0, 6)) {
      this._shoes = value;
    }
  }

  // eyes
  get eyes() {
    return (this._eyes);
  }
  set eyes(value) {
    if (this.between(value, 0, 4)) {
      this._eyes = value;
    }
  }

  // backpack
  get backpack() {
    return (this._backpack);
  }
  set backpack(value) {
    if (this.between(value, 0, 5)) {
      this._backpack = value;
    }
  }

  // gender
  get gender() {
    return (this._gender === 0 ? "MALE" : "FEMALE");
  }
  set gender(value) {
    if (this.between(value, 0, 1)) {
      this._gender = value;
    }
  }

  resetOutfit() {
    this.skin = 0;
    this.hair = 0;
    this.shirt = 0;
    this.pants = 0;
    this.hat = 0;
    this.shoes = 0;
    this.eyes = 0;
    this.backpack = 0;
  }

  /**
   * @return {Object}
   */
  serialize() {
    return ({
      skin: this.skin,
      hair: this.hair,
      shirt: this.shirt,
      pants: this.pants,
      hat: this.hat,
      shoes: this.shoes,
      eyes: this.eyes,
      gender: this.gender,
      backpack: this.backpack
    });
  }

  /**
   * @param {String} str
   */
  parseJSON(str) {
    let obj = JSON.parse(str);
    for (let key in obj) {
      if (this.hasOwnProperty("_" + key)) {
        this[key] = obj[key] << 0;
      }
    };
  }

}