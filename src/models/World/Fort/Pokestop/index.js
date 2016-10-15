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
      //random function-
      let RandAmound= Math.floor(Math.random() * amount) + 1 //randomize value, minimal=1 and max are value you set in DB.
      //end
      for (let ii = 0; ii < RandAmound; ++ii) { //changed amount to RandAmound
        out.push({
          item_id: ENUM.getNameById(ENUM.ITEMS, key << 0)
        });
      };
    };
    return (out);
  }

}
