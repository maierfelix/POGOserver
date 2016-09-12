import { GAME_MASTER } from "../../../shared";

import ENUM from "../../../enum";

/**
 * @class PokeDex
 */
export default class PokeDex {

  /**
   * @param {Player} player
   * @constructor
   */
  constructor(player) {

    this.player = player;

    this.pkmns = {};

  }

  /**
   * @param {Number} dex
   */
  addEntry(dex) {

  }

  /**
   * @param {Number} dex
   */
  removeEntry(dex) {

  }

  /**
   * @return {Array}
   */
  serialize() {
    let out = [];
    for (let key in this.pkmns) {
      let pkmn = this.pkmns[key];
      out.push({
        modified_timestamp_ms: +new Date() - 1e3,
        inventory_item_data: {
          pokedex_entry: {
            pokemon_id: key,
            times_encountered: 1,
            times_captured: 1
          }
        }
      });
    };
    return (out);
  }

  /**
   * @param {String} str
   */
  parseJSON(str) {
    let pkmns = JSON.parse(str);
    for (let pkmn in pkmns) {
      this.addEntry(pkmn);
    };
  }

}