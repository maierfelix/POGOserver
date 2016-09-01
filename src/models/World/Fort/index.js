import MapObject from "../MapObject";

import print from "../../../print";
import CFG from "../../../../cfg";

import {
  validName
} from "../../../utils";

/**
 * @class Fort
 */
export default class Fort extends MapObject {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    super(obj);

    this.enabled = true;
    this.deleted = false;

    this.type = null;

    this.init(obj);

    this.uid += this.type[0].toUpperCase();

  }

  /**
   * @param {Object} obj
   */
  init(obj) {
    obj = obj || {};
    for (let key in obj) {
      if (this.hasOwnProperty(key) && key !== "rewards") {
        this[key] = obj[key];
      }
    };
  }

  /**
   * @return {String}
   */
  getId() {
    return (
      this.cellId + "." + this.uid
    );
  }

  delete() {
    this.deleted = true;
  }

  /**
   * @return {Object}
   */
  serialize() {
    return ({
      id: this.getId(),
      last_modified_timestamp_ms: +new Date(),
      latitude: this.latitude,
      longitude: this.longitude,
      enabled: this.enabled,
      type: this.type
    });
  }

}