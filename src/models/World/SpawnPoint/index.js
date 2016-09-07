import rare from "pokerare";

import MapObject from "../MapObject";
import WildPokemon from "../../Pokemon/WildPokemon";

import print from "../../../print";
import CFG from "../../../../cfg";

const pokename = require("pokename")();

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

    this.spawns = JSON.parse(obj.encounters);

    this.minExpire = ((obj.min_spawn_expire * 1e3) * 60) << 0;
    this.maxExpire = ((obj.max_spawn_expire * 1e3) * 60) << 0;

    this.activeSpawns = [];

    this.init(obj);

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
      if (pkmn.isExpired()) this.despawnPkmn(pkmn);
    });
  }

  /**
   * @return {Object}
   */
  getRandomPosition() {
    let range = .0005;
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
      pokeball: "ITEM_POKE_BALL",
      favorite: 0,
      isWild: true,
      cellId: this.cellId,
      minExpire: this.minExpire,
      maxExpire: this.maxExpire
    });
    this.activeSpawns.push(pkmn);
    print(`Spawned ${pkmn.getPkmnName()} at ${this.cellId}}`);
  }

  /**
   * @param {WildPokemon} pkmn
   */
  despawnPkmn(pkmn) {
    let index = 0;
    this.activeSpawns.map((encounter) => {
      if (encounter.uid === pkmn.uid) {
        print(`Killed 1x ${pkmn.getPkmnName()} at ${this.cellId}`, 33);
        this.activeSpawns.splice(index, 1);
      }
      index++;
    });
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