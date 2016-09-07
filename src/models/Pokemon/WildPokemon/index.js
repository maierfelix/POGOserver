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

    this.encounterId = 0;
    this.spawnPointId = 0;

    this.minExpire = obj.minExpire;
    this.maxExpire = obj.maxExpire;

    this.creation = +new Date();

    this.expiration = ~~(Math.random() * this.maxExpire) + this.minExpire;

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
    return (getHashCodeFrom(this.cellId + "" + this.uid));
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
      encounter_id: this.getEncounterId(),
      last_modified_timestamp_ms: +new Date(),
      latitude: this.latitude,
      longitude: this.longitude,
      pokemon_data: {
        pokemon_id: this.getPkmnId()
      },
      time_till_hidden_ms: this.expiration
    });
  }

  /**
   * @return {Object}
   */
  serializeCatchable() {
    return ({
      encounter_id: this.getEncounterId(),
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