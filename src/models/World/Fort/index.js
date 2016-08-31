import MapObject from "../MapObject";

import print from "../../../print";
import CFG from "../../../../cfg";

import {
  validName
} from "../../../utils";

import enum from "../../../enum";

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

    this.name = null;
    this.description = null;

    this.image_url = null;

    this.cooldown = 5e3;

    this.experience = 0;

    this.rewards = this.parseRewards(obj.rewards);

    this.init(obj);

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
   * @return {Object}
   */
  parseRewards(rewards) {
    rewards = rewards || "{}";
    let json = null;
    try {
      json = JSON.parse(rewards);
    } catch (e) {
      json = {};
      print(e, 31);
    }
    return (json);
  }

  /**
   * @return {Array}
   */
  serializeRewards() {
    let out = [];
    for (let key in this.rewards) {
      let amount = this.rewards[key] << 0;
      for (let ii = 0; ii < amount; ++ii) {
        out.push({
          item_id: enum.getItemNameById(enum.ITEMS, key << 0)
        });
      };
    };
    return (out);
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
      type: "CHECKPOINT"
    });
  }

}