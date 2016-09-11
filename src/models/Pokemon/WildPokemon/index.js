import Pokemon from "../index";

import {
  getUniqueHash,
  getHashCodeFrom
} from "../../../utils";

/**
 * @class WildPokemon
 */
export default class WildPokemon extends Pokemon {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    super(obj);

    this.uid = getUniqueHash();

    this.encounterId = this.getEncounterId();

    this.minExpire = obj.minExpire;
    this.maxExpire = obj.maxExpire;

    this.creation = +new Date();

    this.expiration = ~~(Math.random() * this.maxExpire) + this.minExpire;

    // players who already caught this pkmn
    this.hasCatched = [];

  }

  /**
   * @param {Player} player
   * @return {Boolean}
   */
  caughtBy(player) {
    if (!this.alreadyCatchedBy(player)) {
      this.hasCatched.push(player.uid);
    }
  }

  /**
   * @param {Player} player
   * @return {Boolean}
   */
  alreadyCatchedBy(player) {
    return (
      this.hasCatched.indexOf(player.uid) > -1
    );
  }

  /**
   * @return {Boolean}
   */
  isExpired() {
    return (
      ((this.creation + this.expiration) - +new Date()) <= 0
    );
  }

  /**
   * @return {Number}
   */
  getEncounterId() {
    return (this.uid);
  }

  /**
   * @return {String}
   */
  getPkmnId() {
    return (
      this.getPkmnName().toUpperCase()
    );
  }

  /**
   * @return {Object}
   */
  serializeWild() {
    return ({
      encounter_id: this.encounterId,
      last_modified_timestamp_ms: +new Date(),
      latitude: this.latitude,
      longitude: this.longitude,
      spawn_point_id: this.spawnPointId,
      pokemon_data: {
        pokemon_id: this.getPkmnId(),
        cp: 66,
        stamina: 10,
        stamina_max: 10,
        move_1: "BUG_BITE_FAST",
        move_2: "STRUGGLE",
        height_m: 0.30962005257606506,
        weight_kg: 3.3212273120880127,
        individual_attack: 7,
        individual_defense: 13,
        individual_stamina: 3,
        cp_multiplier: 0.16639786958694458
      },
      time_till_hidden_ms: this.expiration
    });
  }

  /**
   * @return {Object}
   */
  serializeCatchable() {
    return ({
      encounter_id: this.encounterId,
      pokemon_id: this.getPkmnId(),
      expiration_timestamp_ms: this.creation + this.expiration,
      latitude: this.latitude,
      longitude: this.longitude
    });
  }

  /**
   * @return {Object}
   */
  serializeNearby() {
    return ({
      pokemon_id: this.getPkmnId(),
      encounter_id: this.getEncounterId()
    });
  }

}