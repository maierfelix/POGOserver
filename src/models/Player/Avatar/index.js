/**
 * @class Avatar
 */
export default class Avatar {

  /** @constructor */
  constructor() {

    this._skin = 0;
    this._hair = 0;
    this._shirt = 0;
    this._pants = 0;
    this._hat = 0;
    this._shoes = 0;
    this._eyes = 0;
    this._gender = "MALE";
    this._backpack = 0;

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
      this.skin = value;
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
    if (this.between(value, 0, 3)) {
      this._shirt = value;
    }
  }

  // pants
  get pants() {
    return (this._pants);
  }
  set pants(value) {
    if (this.between(value, 0, 2)) {
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

  // gender
  get gender() {
    return (this._gender);
  }
  set gender(value) {
    if (value === "MALE" || value === "FEMALE") {
      this._gender = value;
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

  serialize() {
    return ({
      skin: this.skin,
      hair: this.hair,
      shirt: this.shirt,
      pants: this.pants,
      hat: this.hat,
      shoes: this.shoes,
      eyes: this.eyes,
      gender: this.gender ? "FEMALE" : "MALE",
      backpack: this.backpack
    });
  }

}