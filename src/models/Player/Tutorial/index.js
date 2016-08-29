/**
 * @class Tutorial
 */
export default class Tutorial {

  /** @constructor */
  constructor() {
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

}