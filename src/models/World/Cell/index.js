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

    this.forts = [];

    this.type = obj.type;

    this.synced = false;

    this.expiration = 0;

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

  delete() {
    let index = this.world.getCellIndexByCellId(this.cellId);
    let cell = this.world.cells[index];
    if (cell) {
      this.world.cells.splice(index, 1);
      print(`Cell ${cell.cellId} timed out!`, 33);
    }
  }

  /**
   * @param {Object} obj
   * @return {Fort}
   */
  addFort(obj) {
    obj.world = this.world;
    let fort = (
      obj.type === "CHECKPOINT" ? new Pokestop(obj) :
      obj.type === "SPAWN" ? new SpawnPoint(obj) :
      new Gym(obj)
    );
    this.forts.push(fort);
    return (fort);
  }

  refreshSpawnPoints() {
    this.forts.map((fort) => {
      if (fort.isSpawn === true) {
        fort.refresh();
      }
    });
  }

  loadForts() {
    return new Promise((resolve) => {
      this.expiration = +new Date() + CFG.CELL_TIMEOUT;
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
          print(`Synced ${this.cellId} with database..`, 33);
          resolve(this.forts);
        });
      }
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
      type === "SPAWN" ?
      CFG.MYSQL_SPAWN_TABLE :
      type === "GYM" ?
      CFG.MYSQL_GYM_TABLE :
      "INVALID"
    );
  }

  getSpawnsFromDatabase() {
    return new Promise((resolve) => {
      this.world.instance.getQueryByColumnFromTable("cell_id", this.cellId, CFG.MYSQL_SPAWN_TABLE).then((spawns) => {
        resolve(spawns || []);
      });
    });
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
          this.world.instance.getQueryByColumnFromTable("cell_id", this.cellId, CFG.MYSQL_SPAWN_TABLE).then((forts) => {
            forts = forts || [];
            forts.map((fort) => {
              fort.type = "SPAWN";
              out.push(fort);
            });
            resolve(out);
          });
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
      if (fort.uid === id) return (index);
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
  serializeSpawnPoints() {
    let ii = 0;
    let length = this.forts.length;
    let out = [];
    let fort = null;
    for (; ii < length; ++ii) {
      fort = this.forts[ii];
      if (!(fort.isSpawn === true)) continue;
      out.push(fort.serialize());
    };
    return (out);
  }

  /**
   * @param {Player} player
   * @return {Array}
   */
  serializePkmns(player) {
    let ii = 0;
    let length = this.forts.length;
    let out = {
      wild: [],
      nearby: [],
      catchable: []
    };
    let fort = null;
    for (; ii < length; ++ii) {
      fort = this.forts[ii];
      if (!(fort.isSpawn === true)) continue;
      fort.activeSpawns.map((encounter) => {
        if (
          !encounter.alreadyCatchedBy(player) &&
          !encounter.isDespawned
        ) {
          out.wild.push(encounter.serializeWild());
          out.nearby.push(encounter.serializeNearby());
          out.catchable.push(encounter.serializeCatchable());
        }
      });
    };
    return (out);
  }

  /**
   * @param {Player} player
   * @return {Object}
   */
  serialize(player) {
    let buffer = {
      s2_cell_id: this.cellId,
      current_timestamp_ms: +new Date(),
      forts: this.forts.map((fort) => { if (!fort.isSpawn) return fort.serialize(); }),
      spawn_points: this.serializeSpawnPoints(),
      deleted_objects: [],
      fort_summaries: [],
      decimated_spawn_points: [],
      wild_pokemons: null,
      catchable_pokemons: null,
      nearby_pokemons: null
    };
    let pkmns = this.serializePkmns(player);
    buffer.wild_pokemons = pkmns.wild;
    buffer.nearby_pokemons = pkmns.nearby;
    buffer.catchable_pokemons = pkmns.catchable;
    return (buffer);
  }

}