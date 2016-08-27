import Candy from "./Candy";

/**
 * @class Tutorial
 */
export default class Tutorial {

  /** @constructor */
  constructor() {

    this.states = [];

    this.LEGAL_SCREEN = 0;
    this.AVATAR_SELECTION = 1;
    this.ACCOUNT_CREATION = 2;
    this.POKEMON_CAPTURE = 3;
    this.NAME_SELECTION = 4;
    this.POKEMON_BERRY = 5;
    this.USE_ITEM = 6;
    this.FIRST_TIME_EXPERIENCE_COMPLETE = 7;
    this.POKESTOP_TUTORIAL = 8;
    this.GYM_TUTORIAL = 9;

  }

  passLegalScreen() {
    
  }

  passAvatarSelection() {
    
  }

  passAccountCreation() {
    
  }

  /**
   * @return {Array}
   */
  serialize() {
    return (
      this.states
    );
  }

}