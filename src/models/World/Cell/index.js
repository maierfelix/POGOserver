import s2 from "s2-geometry";
import rare from "pokerare";

import Gym from "../Fort/Gym";
import Pokestop from "../Fort/Pokestop";

import WildPokemon from "../../Pokemon/WildPokemon";

import MapObject from "../MapObject";
import Settings from "../../../modes";
import CFG from "../../../../cfg";

import print from "../../../print";

const S2Geo = s2.S2;
const MAP_REFRESH_RATE = Settings.GAME_SETTINGS.map_settings.get_map_objects_max_refresh_seconds;

/**
 * @class Cell
 */
export default class Cell extends MapObject {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    super(obj);

    this._uPkmnId = 0;

    this.synced = false;

    this.forts = [];

    this.encounters = [];

    this.type = obj.type;

  }

  get uPkmnId() {
    return (this._uPkmnId);
  }
  set uPkmnId(value) {
    if (this.uPkmnId < Number.MAX_SAFE_INTEGER) this._uPkmnId += value;
    else this._uPkmnId = 0;
  }

  /**
   * @param  {Number} lat
   * @param  {Number} lng
   * @return {String}
   */
  static getIdByPosition(lat, lng, zoom) {
    return (
      S2Geo.keyToId(S2Geo.latLngToKey(lat, lng, zoom || 15))
    );
  }

  /**
   * @param {Object} obj
   * @return {Fort}
   */
  addFort(obj) {
    obj.world = this.world;
    let fort = null;
    fort = obj.type === "CHECKPOINT" ? new Pokestop(obj) : new Gym(obj);
    this.forts.push(fort);
    return (fort);
  }

  /**
   * @return {WildPokemon}
   */
  addEncounter() {
    let pkmn = this.getRandomEncounter();
    print(`Spawned 1x ${pkmn.getPkmnName()} at ${this.cellId}`);
    this.encounters.push(pkmn);
    return (pkmn);
  }

  getRandomEncounter() {
    let ids = rare.getPkmnByRarity(255, 255);
    let index = Math.floor(Math.random() * ids.length);
    return new WildPokemon({
      dexNumber: ids[index].id,
      pokeball: "ITEM_POKE_BALL",
      favorite: 0,
      isWild: true,
      uid: this.uPkmnId++,
      cellId: this.cellId
    });
  }

  /**
   * @param {WildPokemon} encounter
   */
  removeEncounter(encounter) {
    let index = 0;
    this.encounters.map((pkmn) => {
      if (pkmn.uid === encounter.uid) {
        print(`Killed 1x ${pkmn.getPkmnName()} at ${this.cellId}`, 33);
        this.encounters.splice(index, 1);
      }
      index++;
    });
  }

  refreshEncounters() {
    this.encounters.map((encounter) => {
      if (encounter.isExpired()) {
        this.removeEncounter(encounter);
      }
    });
  }

  loadForts() {
    return new Promise((resolve) => {
      if (this.synced) {
        this.forts.map((fort) => {
          this.processDeletedFort(fort);
        });
        resolve(this.forts);
      }
      else {
        this.getFortsFromDatabase().then((forts) => {
          this.forts = [];
          forts.map((fort) => {
            this.processDeletedFort(this.addFort(fort));
          });
          this.synced = true;
          //print(`Synced ${this.cellId} with database..`, 33);
          resolve(this.forts);
        });
      }
    });
  }

  /**
   * @param {String} type
   * @return {String}
   */
  static getTable(type) {
    return (
      type === "CHECKPOINT" ?
      CFG.MYSQL_POKESTOP_TABLE :
      CFG.MYSQL_GYM_TABLE
    );
  }

  getFortsFromDatabase() {
    return new Promise((resolve) => {
      let out = [];
      this.world.instance.getQueryByColumnFromTable("cell_id", this.cellId, CFG.MYSQL_POKESTOP_TABLE).then((forts) => {
        forts = forts || [];
        forts.map((fort) => {
          fort.type = "CHECKPOINT";
          out.push(fort);
        });
        this.world.instance.getQueryByColumnFromTable("cell_id", this.cellId, CFG.MYSQL_GYM_TABLE).then((forts) => {
          forts = forts || [];
          forts.map((fort) => {
            fort.type = "GYM";
            out.push(fort);
          });
          resolve(out);
        });
      });
    });
  }

  /**
   * Dirty hack to display disappearing forts
   * seems like game engine doesnt support dat
   * @param {Fort} fort
   */
  processDeletedFort(fort) {
    if (fort.deleted) {
      fort.latitude = 0;
      fort.longitude = 0;
      fort.enabled = false;
      // wait for the next map refresh
      setTimeout(() => {
        this.deleteFortById(fort.uid);
        this.deleteFortFromDatabase(fort).then(() => {
          // do sth after
        });
      }, (MAP_REFRESH_RATE * 1e3) * 3);
    }
  }

  /**
   * @param {Fort} fort
   */
  deleteFortFromDatabase(fort) {
    return new Promise((resolve) => {
      let table = Cell.getTable(fort.type);
      this.world.instance.db.query(`DELETE FROM ${table} WHERE cell_id=? AND id=? LIMIT 1`, [fort.cellId, fort.uid], (e, res) => {
        resolve();
      });
    });
  }

  /**
   * @param {Number} id
   * @return {Number}
   */
  getFortIndexById(id) {
    let index = 0;
    for (let fort of this.forts) {
      if (fort.uid === id || fort.uid === id << 0) return (index);
      ++index;
    };
    return (-1);
  }

  /**
   * @param {Number} id
   * @return {Fort}
   */
  getFortById(id) {
    let index = this.getFortIndexById(id);
    if (index < 0) return (null);
    return (this.forts[index]);
  }

  /**
   * @param {Number} id
   * @return {Fort}
   */
  deleteFortById(id) {
    let index = this.getFortIndexById(id);
    if (index < 0) return (null);
    return (this.forts.splice(index, 1));
  }

  /**
   * @return {Object}
   */
  serialize() {
    return ({
      s2_cell_id: this.cellId,
      current_timestamp_ms: +new Date(),
      forts: this.forts.map((fort) => { return fort.serialize(); }),
      spawn_points: [],
      deleted_objects: [],
      fort_summaries: [],
      decimated_spawn_points: [],
      wild_pokemons: this.encounters.map((pkmn) => { return pkmn.serializeWild(); }),
      catchable_pokemons: this.encounters.map((pkmn) => { return pkmn.serializeCatchable(); }),
      nearby_pokemons: this.encounters.map((pkmn) => { return pkmn.serializeNearby(); })
    });
  }

}