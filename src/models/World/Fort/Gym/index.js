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
export default class Gym extends Fort {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    super(obj);

    this.team = 0;

    this.guardPkmn = 0;
    this.guardPkmnCp = 0;

    this.gymPoints = 0;

    this.isInBattle = 0;

    this.init(obj);

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
      owned_by_team: ENUM.getNameById(ENUM.TEAM, this.team),
      guard_pokemon_id: this.guardPkmn,
      gym_points: this.gymPoints,
      active_fort_modifier: []
    });
  }

}