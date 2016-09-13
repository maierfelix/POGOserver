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
   * @return {Boolean}
   */
  entryExists(dex) {
    return (
      this.pkmns.hasOwnProperty(dex)
    );
  }

  /**
   * @param {Number} dex
   * @param {Number} capture
   * @param {Number} encounter
   */
  addEntry(dex, capture, encounter) {
    if (this.entryExists(dex)) {
      this.pkmns[dex].captured += capture << 0;
      this.pkmns[dex].encountered += encounter << 0;
    } else {
      this.pkmns[dex] = {
        captured: 0,
        encountered: 0
      };
      this.addEntry(dex, capture, encounter);
    }
  }

  /**
   * @param {Number} dex
   */
  removeEntry(dex) {
    if (this.entryExists(dex)) {
      delete this.pkmns[dex];
    }
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
            times_captured: this.pkmns[key].captured,
            times_encountered: this.pkmns[key].encountered
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