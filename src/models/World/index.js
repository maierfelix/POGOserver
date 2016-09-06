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
   * @return {Cell}
   */
  getCellByCellId(cellId) {
    let ii = 0;
    let length = this.cells.length;
    for (; ii < length; ++ii) {
      if (this.cells[ii].cellId === cellId) return (this.cells[ii]);
    };
    return (null);
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

  spawnEncounters() {

    let ii = 0;
    let length = this.cells.length;

    let cell = null;

    for (; ii < length; ++ii) {
      cell = this.cells[ii];
      if (Math.random() < .25 && cell.encounters.length <= 3) {
        cell.addEncounter();
      }
      cell.refreshEncounters();
    };

  }

  /**
   * @param {String} type
   * @param {Object} msg
   */
  getPacket(type, msg) {
    return new Promise((resolve) => {
      switch (type) {
        case "ENCOUNTER":
          this.Encounter(msg).then((result) => {
            resolve(result);
          });
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