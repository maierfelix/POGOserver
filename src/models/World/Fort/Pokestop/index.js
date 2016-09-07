import Fort from "../index";

import print from "../../../../print";
import CFG from "../../../../../cfg";

import {
  validName
} from "../../../../utils";

import ENUM from "../../../../enum";

/**
 * @class Gym
 */
export default class Pokestop extends Fort {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    super(obj);

    this.name = null;
    this.description = null;

    this.image_url = null;

    this.cooldown = 10e3;

    this.experience = 0;

    this.rewards = this.parseRewards(obj.rewards);

    this.init(obj);

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
          item_id: ENUM.getNameById(ENUM.ITEMS, key << 0)
        });
      };
    };
    return (out);
  }

}
