import ENUM from "../../../enum";

/**
 * @class Tutorial
 */
export default class Tutorial {

  /**
   * @param {Player} player
   * @constructor
   */
  constructor(player) {

    this.player = player;

    this.states = [];

  }

  /**
   * @param {String} name
   * @return {String}
   */
  getItemName(name) {
    return (
      ENUM.getNameById(ENUM.TUTORIAL, name)
    );
  }

  skipTutorial() {
    this.states = [
      "LEGAL_SCREEN",
      "AVATAR_SELECTION",
      "POKEMON_CAPTURE",
      "NAME_SELECTION",
      "FIRST_TIME_EXPERIENCE_COMPLETE"
    ];
  }

  /**
   * @return {Array}
   */
  serialize() {
    return (
      this.states
    );
  }

  /**
   * @return {String}
   */
  querify() {
    let buffer = {
      "states": this.serialize()
    };
    return (JSON.stringify(buffer));
  }

  /**
   * @param {String} str
   */
  parseJSON(str) {
    this.states = [];
    let obj = JSON.parse(str);
    for (let key in obj) {
      let name = this.getItemName(key);
      if (obj[key] === 1) {
        this.states.push(name.toUpperCase());
      }
    };
  }

}