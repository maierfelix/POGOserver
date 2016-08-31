import Pokemon from "../index";
//import CaptureProbability from "CaptureProbability";

/**
 * @class WildPokemon
 */
class WildPokemon extends Pokemon {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    super(obj);

    this.encounterId = 0;

    this.latitude = 0;
    this.longitude = 0;

    this.pokeball = 0;

    this.spawnPoint = 0;

  }

}