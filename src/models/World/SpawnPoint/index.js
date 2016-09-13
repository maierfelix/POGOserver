import rare from "pokerare";

import MapObject from "../MapObject";
import WildPokemon from "../../Pokemon/WildPokemon";

import print from "../../../print";
import CFG from "../../../../cfg";

import Settings from "../../../modes";

const pokename = require("pokename")();

const MAP_REFRESH_RATE = Settings.GAME_SETTINGS.map_settings.get_map_objects_max_refresh_seconds;

/**
 * @class SpawnPoint
 */
export default class SpawnPoint extends MapObject {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    super(obj);

    this.type = null;

    this.range = 3;

    this.spawns = JSON.parse(obj.encounters);

    this.minExpire = ((obj.min_spawn_expire) * 60) << 0;
    this.maxExpire = ((obj.max_spawn_expire) * 60) << 0;

    this.isSpawn = true;

    this.activeSpawns = [];

    this.init(obj);

    this.uid += this.type[0].toUpperCase();

  }

  /**
   * @param {Object} obj
   */
  init(obj) {
    obj = obj || {};
    for (let key in obj) {
      if (this.hasOwnProperty(key)) {
        this[key] = obj[key];
      }
    };
  }

  refresh() {
    this.activeSpawns.map((pkmn) => {
      if (pkmn.isExpired() && !pkmn.isDespawned) {
        pkmn.isDespawned = true;
        pkmn.despawnIn = +new Date() + ((MAP_REFRESH_RATE * 1e3) + pkmn.expiration);
      }
      else if (pkmn.isDespawned) {
        if (+new Date() >= pkmn.despawnIn) {
          this.despawnPkmn(pkmn);
        }
      }
    });
  }

  /**
   * @return {Object}
   */
  getRandomPosition() {
    let range = this.range / 1e4;
    let latitude = this.latitude + (Math.random() * (range * 2)) - range;
    let longitude = this.longitude + (Math.random() * (range * 2)) - range;
    return ({
      lat: latitude,
      lng: longitude
    });
  }

  spawnPkmn() {
    let randId = this.spawns[Math.floor(Math.random() * this.spawns.length)];
    let randPos = this.getRandomPosition();
    let pkmn = new WildPokemon({
      dexNumber: randId,
      latitude: randPos.lat,
      longitude: randPos.lng,
      isWild: true,
      cellId: this.cellId,
      spawnPointId: this.uid,
      minExpire: this.minExpire,
      maxExpire: this.maxExpire
    });
    this.activeSpawns.push(pkmn);
    print(`Spawned 1x ${pkmn.getPkmnName()}:${pkmn.uid} at ${this.cellId}`);
  }

  /**
   * @param {WildPokemon} pkmn
   */
  despawnPkmn(pkmn) {
    let index = 0;
    this.activeSpawns.map((encounter) => {
      if (encounter.uid === pkmn.uid) {
        print(`Killed 1x ${pkmn.getPkmnName()}:${pkmn.uid} at ${this.cellId}`, 33);
        this.activeSpawns.splice(index, 1);
      }
      index++;
    });
  }

  /**
   * @param {String} id
   * @return {WildPokemon}
   */
  getPkmnSpawnById(id) {
    let ii = 0;
    let length = this.activeSpawns.length;
    let spawn = null;
    for (; ii < length; ++ii) {
      spawn = this.activeSpawns[ii];
      if (spawn.uid === id) return (spawn);
    }
    return (null);
  }

  /**
   * @return {Object}
   */
  serialize() {
    return ({
      latitude: this.latitude,
      longitude: this.longitude
    });
  }

}