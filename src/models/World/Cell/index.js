import s2 from "s2-geometry";

import Gym from "../Fort/Gym";
import Pokestop from "../Fort/Pokestop";
import MapObject from "../MapObject";
import SpawnPoint from "../SpawnPoint";
import WildPokemon from "../../Pokemon/WildPokemon";

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
    this.spawns = [];

    this.type = obj.type;

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
   * @param {Object} obj
   * @return {SpawnPoint}
   */
  addSpawnPoint(obj) {
    obj.world = this.world;
    let spawn = null;
    spawn = new SpawnPoint(obj);
    this.spawns.push(spawn);
    return (spawn);
  }

  refreshSpawnPoints() {
    this.spawns.map((spawn) => {
      spawn.refresh();
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
        this.getSpawnsFromDatabase().then((spawns) => {
          spawns.map((spawn) => {
            this.addSpawnPoint(spawn);
          });
          this.getFortsFromDatabase().then((forts) => {
            this.forts = [];
            forts.map((fort) => {
              this.processDeletedFort(this.addFort(fort));
            });
            this.synced = true;
            //print(`Synced ${this.cellId} with database..`, 33);
            resolve(this.forts);
          });
        });
      }
    });
  }

  getSpawnsFromDatabase() {
    return new Promise((resolve) => {
      this.world.instance.getQueryByColumnFromTable("cell_id", this.cellId, CFG.MYSQL_SPAWN_TABLE).then((spawns) => {
        resolve(spawns || []);
      });
    });
  }

  /**
   * @param {String} type
   * @return {String}
   */
  static getFortTable(type) {
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
      let table = Cell.getFortTable(fort.type);
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
   * @return {Array}
   */
  serializeWildPkmns() {
    let ii = 0;
    let length = this.spawns.length;
    let out = [];
    let spawn = null;
    for (; ii < length; ++ii) {
      spawn = this.spawns[ii];
      spawn.activeSpawns.map((encounter) => {
        out.push(encounter.serializeWild());
      });
    };
    return (out);
  }

  /**
   * @return {Array}
   */
  serializeCatchablePkmns() {
    let ii = 0;
    let length = this.spawns.length;
    let out = [];
    let spawn = null;
    for (; ii < length; ++ii) {
      spawn = this.spawns[ii];
      spawn.activeSpawns.map((encounter) => {
        out.push(encounter.serializeCatchable());
      });
    };
    return (out);
  }

  /**
   * @return {Array}
   */
  serializeNearbyPkmns() {
    let ii = 0;
    let length = this.spawns.length;
    let out = [];
    let spawn = null;
    for (; ii < length; ++ii) {
      spawn = this.spawns[ii];
      spawn.activeSpawns.map((encounter) => {
        out.push(encounter.serializeNearby());
      });
    };
    return (out);
  }

  /**
   * @return {Object}
   */
  serialize() {
    return ({
      s2_cell_id: this.cellId,
      current_timestamp_ms: +new Date(),
      forts: this.forts.map((fort) => { return fort.serialize(); }),
      spawn_points: this.spawns.map((spawn) => { return spawn.serialize(); }),
      deleted_objects: [],
      fort_summaries: [],
      decimated_spawn_points: [],
      wild_pokemons: this.serializeWildPkmns(),
      catchable_pokemons: this.serializeCatchablePkmns(),
      nearby_pokemons: this.serializeNearbyPkmns()
    });
  }

}