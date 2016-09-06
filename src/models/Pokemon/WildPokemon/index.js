import s2 from "s2-geometry";
import Pokemon from "../index";

import Settings from "../../../modes";

import { getHashCodeFrom } from "../../../utils";

const S2Geo = s2.S2;

const MAP_REFRESH_RATE = Settings.GAME_SETTINGS.map_settings.get_map_objects_max_refresh_seconds;
const EXPIRE_MULTIPLIER = Settings.PKMN_SETTINGS.EXPIRE_MULTIPLIER;

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

    this.encounterId = 0;
    this.spawnPointId = 0;

    this.creation = +new Date();

    this.expiration = ~~(Math.random() * (MAP_REFRESH_RATE * 1e3) * EXPIRE_MULTIPLIER) + (MAP_REFRESH_RATE * 1e3);

    this.setRandomPosition();

    this.uid = Math.random() * 1e5 << 0;

  }

  setRandomPosition() {
    let pos = S2Geo.idToLatLng(this.cellId);
    this.latitude = pos.lat + (Math.random() * .009) + .0002;
    this.longitude = pos.lng + (Math.random() * .009) + .0002;
  }

  /**
   * @return {Boolean}
   */
  isExpired() {
    return (
      +new Date() >= this.creation + this.expiration
    );
  }

  getEncounterId() {
    return (getHashCodeFrom(this.cellId + "" + this.uid));
  }

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