import MapObject from "../MapObject";

import print from "../../../print";
import CFG from "../../../../cfg";

import {
  validName
} from "../../../utils";

/**
 * @class Gym
 */
export default class Gym extends MapObject {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    super(obj);

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

  /**
   * @return {Object}
   */
  serialize() {
    return ({});
  }

}