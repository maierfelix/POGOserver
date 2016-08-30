import s2 from "s2-geometry";
import Fort from "./Fort";
import Player from "../Player";

import Settings from "../../modes";

import CFG from "../../../cfg";

import print from "../../print";

import * as _packets from "./packets";

import { inherit } from "../../utils";

const S2Geo = s2.S2;

const MAP_REFRESH_RATE = Settings.GAME_SETTINGS.map_settings.get_map_objects_max_refresh_seconds;

/**
 * @class World
 */
export default class World {

  /** @constructor */
  constructor(instance) {

    this.instance = instance;

    this.db = this.instance.db;

    this.players = [];

    this.cells = {};

  }

  get connectedPlayers() {
    return (this.players.length);
  }

  /**
   * @return {Boolean}
   */
  isFull() {
    return (
      this.connectedPlayers >= CFG.MAX_CONNECTIONS
    );
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  getPlayerByRequest(req, res) {

    let player = null;

    if (this.playerAlreadyConnected(req)) {
      player = this.getPlayerByIP(req.headers.host);
      return (player);
    }
    else {
      player = this.addPlayer(req, res);
      return (player);
    }

  }

  /**
   * @param {Request} req
   * @return {Boolean}
   */
  playerAlreadyConnected(req) {

    let ii = 0;
    let length = this.connectedPlayers;

    let remoteAddress = req.headers.host;

    for (; ii < length; ++ii) {
      if (this.players[ii].remoteAddress === remoteAddress) {
        return (true);
      }
    };

    return (false);

  }

  /**
   * @param {String} ip
   */
  getPlayerByIP(ip) {

    let players = this.players;

    let ii = 0;
    let length = this.connectedPlayers;

    for (; ii < length; ++ii) {
      if (players[ii].remoteAddress === ip) {
        return (players[ii]);
      }
    };

    return (null);

  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @return {Player}
   */
  addPlayer(req, res) {

    let player = new Player({
      world: this,
      request: req,
      response: res
    });

    player.remoteAddress = req.headers.host;

    this.players.push(player);

    return (player);

  }

  /**
   * @param {Player} player
   */
  removePlayer(player) {
    console.log("Remove:", player.email);
  }

  spawnFort() {

  }

  spawnGym() {
    
  }

  spawnEncounter() {
    
  }

  /**
   * @param  {String} id
   * @return {Object}
   */
  getCellById(id) {
    if (!this.cells[id]) {
      this.cells[id] = {
        id: id,
        forts: [],
        synced: false
      };
    }
    return (this.cells[id]);
  }

  getFortsByCells(cells, out, index) {
    return new Promise((resolve) => {
      this.getFortsByCell(cells[index]).then((result) => {
        out.push(result);
        if (++index >= cells.length) {
          print(`Syncing forts with database!`, 33);
          resolve(out);
        }
        else resolve(this.getFortsByCells(cells, out, index));
      });
    });
  }

  /**
   * Dirty hack to display disappearing forts
   * @param {Fort} fort
   */
  processDeletedFort(fort) {
    if (fort.deleted) {
      fort.latitude = 0;
      fort.longitude = 0;
      this.instance.db.query("DELETE FROM forts WHERE cell_id=? AND cell_uid=? LIMIT 1", [fort.cellId, fort.uid], (e, res) => {
        setTimeout(() => {
          this.deleteFortById(fort.cellId, fort.uid);
        }, MAP_REFRESH_RATE + 2e3);
      });
    }
  }

  /**
   * @param {String} id
   * @param {Number} uid
   * @return {Number}
   */
  getFortIndexById(id, uid) {
    let cell = this.getCellById(id);
    let index = 0;
    if (!cell) return (-1);
    for (let fort of cell.forts) {
      if (fort.uid === uid) return (index);
      ++index;
    };
    return (-1);
  }

  /**
   * @param {String} id
   * @param {Number} uid
   * @return {Fort}
   */
  getFortById(id, uid) {
    let cell = this.getCellById(id);
    let index = this.getFortIndexById(id, uid);
    return new Promise((resolve) => {
      if (!cell.forts[index]) {
        this.getFortsByCell(id).then((forts) => {
          resolve(this.getFortById(id, uid));
        });
      }
      else {
        resolve(cell.forts[index]);
      }
    });
  }

  /**
   * @param {String} id
   * @param {Number} uid
   * @return {Fort}
   */
  deleteFortById(id, uid) {
    let cell = this.getCellById(id);
    let index = this.getFortIndexById(id, uid);
    if (index < 0) return (null);
    return (cell.forts.splice(index, 1));
  }

  /**
   * @param {Object} obj
   */
  insertFort(obj) {

    let lat = obj.latitude;
    let lng = obj.longitude;

    let id = S2Geo.keyToId(S2Geo.latLngToKey(lat, lng, obj.zoom));

    let name = obj.name || "";
    let desc = obj.description || "";

    let img = "http://thecatapi.com/api/images/get?format=src&type=png&d=" + +new Date();

    let query = "INSERT INTO forts SET cell_id=?, cell_uid=?, latitude=?, longitude=?, name=?, description=?, image_url=?, rewards=?";

    obj.cell_id = id;

    return new Promise((resolve) => {
      this.instance.db.query(query, [id, 0, lat, lng, name, desc, img, ""], (e, res) => {
        let insertId = res.insertId;
        this.instance.db.query("SELECT * from forts WHERE cell_id=? ORDER BY cell_uid DESC", [id], (e, res) => {
          let index = res instanceof Array ? res[0].cell_uid + 1 : 0;
          this.instance.db.query("UPDATE forts SET cell_uid=? WHERE id=?", [index, insertId], (e, res) => {
            obj.cell_uid = index;
            resolve(this.addFort(obj));
          });
        });
      });
    });

  }

  /**
   * @param {Object} obj
   * @return {Fort}
   */
  addFort(obj) {
    let cell = this.getCellById(obj.cell_id);
    let fort = new Fort(obj);
    cell.forts.push(fort);
    return (fort);
  }

  /**
   * @param  {String} cell
   * @return {Array}
   */
  getFortsByCell(cellId) {
    return new Promise((resolve) => {
      let cell = this.getCellById(cellId);
      // cached
      if (cell && cell.synced) {
        cell.forts.map((fort) => {
          this.processDeletedFort(fort);
        });
        resolve(cell);
      }
      // load from db
      else this.loadFortsFromDbByCell(cellId).then((forts) => {
        let result = this.getCellById(cellId);
        forts.map((fort) => {
          let index = result.forts.push(new Fort(fort)) - 1;
          this.processDeletedFort(result.forts[index]);
        });
        cell.synced = true;
        resolve(result);
      });
    });
  }

  /**
   * @param {String} cell
   */
  loadFortsFromDbByCell(cell) {
    return new Promise((resolve) => {
      this.instance.getQueryByColumnFromTable("cell_id", cell, "forts").then((forts) => {
        forts = forts || [];
        resolve(forts);
      });
    });
  }

  /**
   * @param {String} type
   * @param {Object} msg
   */
  getPacket(type, msg) {
    return new Promise((resolve) => {
      switch (type) {
        case "FORT_SEARCH":
          this.FortSearch(msg).then((result) => {
            resolve(result);
          });
        break;
        case "FORT_DETAILS":
          this.FortDetails(msg).then((result) => {
            resolve(result);
          });
        break;
        case "GET_MAP_OBJECTS":
          this.GetMapObjects(msg).then((result) => {
            resolve(result);
          });
        break;
        case "CHECK_CHALLENGE":
          resolve(this.CheckChallenge(msg));
        break;
        case "DOWNLOAD_SETTINGS":
          resolve(this.DownloadSettings(msg));
        break;
        case "DOWNLOAD_REMOTE_CONFIG_VERSION":
          resolve(this.DownloadRemoteConfigVersion(msg));
        break;
        case "DOWNLOAD_ITEM_TEMPLATES":
          resolve(this.DownloadItemTemplates(msg));
        break;
      };
    });
  }

}

inherit(World, _packets);