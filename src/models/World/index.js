import Cell from "./Cell";

import CFG from "../../../cfg";

import print from "../../print";

import * as _forts from "./forts";
import * as _players from "./players";
import * as _packets from "./packets";

import { inherit } from "../../utils";

/**
 * @class World
 */
export default class World {

  /** @constructor */
  constructor(instance) {

    this.instance = instance;

    this.db = this.instance.db;

    this.players = [];

    this.cells = [];

  }

  get connectedPlayers() {
    return (this.players.length);
  }

  /**
   * @param {String} cellId
   * @return {Number}
   */
  getCellIndexByCellId(cellId) {
    let ii = 0;
    let length = this.cells.length;
    for (; ii < length; ++ii) {
      if (this.cells[ii].cellId === cellId) return (ii);
    };
    return (-1);
  }

  /**
   * @param {String} cellId
   * @return {Cell}
   */
  getCellByCellId(cellId) {
    let index = this.getCellIndexByCellId(cellId);
    return (this.cells[index] || null);
  }

  /**
   * @param {String} cellId
   * @return {Boolean}
   */
  cellAlreadyRegistered(cellId) {
    let cell = this.getCellByCellId(cellId);
    return (
      cell !== null
    );
  }

  /**
   * @param {String} cellId
   * @return {Cell}
   */
  getCellById(cellId) {
    return (this.getCellByCellId(cellId));
  }

  refreshSpawns() {
    let ii = 0;
    let length = this.cells.length;
    for (; ii < length; ++ii) {
      this.cells[ii].refreshSpawnPoints();
    };
  }

  /**
   * @param {Number} lat
   * @param {Number} lng
   */
  triggerSpawnAt(lat, lng) {
    let cell = this.getCellById(Cell.getIdByPosition(lat, lng, 15));
    // Wait until cell got registered
    if (cell === null) return void 0;
    cell.forts.map((fort) => {
      if (fort.isSpawn) {
        if (fort.activeSpawns.length >= fort.spawns.length) return void 0;
        fort.spawnPkmn();
      }
    });
  }

  /**
   * @param  {String} id
   * @return {WildPokemon}
   */
  getEncounterById(id) {
    id = parseInt(id);
    let ii = 0;
    let jj = 0;
    let fortLength = 0;
    let cellLength = this.cells.length;
    let cell = null;
    let fort = null;
    let pkmn = null;
    for (; ii < cellLength; ++ii) {
      cell = this.cells[ii];
      fortLength = cell.forts.length;
      for (; jj < fortLength; ++jj) {
        fort = cell.forts[jj];
        if (fort.isSpawn === true) {
          if ((pkmn = fort.getPkmnSpawnById(id)) !== null) {
            return (pkmn);
          }
        }
      };
      jj = 0;
    };
    return (pkmn);
  }

  /**
   * @param {String} type
   * @param {Object} msg
   */
  getPacket(type, msg) {
    return new Promise((resolve) => {
      switch (type) {
        case "ENCOUNTER":
          resolve(this.Encounter(msg));
        break;
        case "CATCH_POKEMON":
          resolve(this.CatchPokemon(msg));
        break;
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
        case "GET_DOWNLOAD_URLS":
          resolve(this.GetDownloadUrls(msg));
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

inherit(World, _forts);
inherit(World, _players);
inherit(World, _packets);