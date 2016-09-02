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
    this.skipTutorial();
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

}