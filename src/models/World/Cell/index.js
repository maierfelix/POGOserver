import s2 from "s2-geometry";

import Fort from "../Fort";
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

    this.synced = false;

    this.forts = [];

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
          print(`Synced ${this.cellId} with database..`, 33);
          resolve(this.forts);
        });
      }
    });
  }

  getFortsFromDatabase() {
    return new Promise((resolve) => {
      this.world.instance.getQueryByColumnFromTable("cell_id", this.cellId, CFG.MYSQL_FORT_TABLE).then((forts) => {
        resolve(forts || []);
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

        });
      }, (MAP_REFRESH_RATE * 1e3) * 3);
    }
  }

  /**
   * @param {Fort} fort
   */
  deleteFortFromDatabase(fort) {
    return new Promise((resolve) => {
      this.world.instance.db.query(`DELETE FROM ${CFG.MYSQL_FORT_TABLE} WHERE cell_id=? AND id=? LIMIT 1`, [fort.cellId, fort.uid], (e, res) => {
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
   * @param {Object} obj
   * @return {Fort}
   */
  addFort(obj) {
    obj.world = this.world;
    let fort = new Fort(obj);
    this.forts.push(fort);
    return (fort);
  }

}