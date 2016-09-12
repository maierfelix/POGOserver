import Pokemon from "../../Pokemon";
import WildPokemon from "../../Pokemon/WildPokemon";

import print from "../../../print";

import CFG from "../../../../cfg";

/**
 * @class Party
 */
export default class Party {

  /**
   * @param {Player} player
   * @constructor
   */
  constructor(player) {

    this.player = player;

    this.party = [];

  }

  syncWithDatabase() {
    let query = `SELECT * FROM ${CFG.MYSQL_OWNED_PKMN_TABLE} WHERE owner_id=?`;
    return new Promise((resolve) => {
      this.player.world.db.query(query, [this.player.uid], (e, rows) => {
        if (e) return print(e, 31);
        rows.map((row) => {
          row.isOwned = true;
          this.addPkmn(row);
        });
        resolve();
      });
    });
  }

  /**
   * @param {Object} obj
   * @return {Pokemon}
   */
  addPkmn(obj) {
    obj.owner = this.player;
    let pkmn = new Pokemon(obj);
    this.party.push(pkmn);
    return (pkmn);
  }

  /**
   * @param {Number} id
   * @return {Number}
   */
  getPkmnIndexById(id) {
    id = parseInt(id);
    for (let ii = 0; ii < this.party.length; ++ii) {
      if (this.party[ii].uid === id) return (ii);
    };
    return (-1);
  }

  /**
   * @param {Number} id
   * @return {Pokemon}
   */
  getPkmnById(id) {
    let index = this.getPkmnIndexById(id);
    return (this.party[index]);
  }

  /**
   * @param {Number} id
   */
  deletePkmn(id) {
    let index = this.getPkmnIndexById(id);
    let pkmn = this.party[index];
    if (pkmn) this.party.splice(index, 1);
  }

  /**
   * @return {Number}
   */
  getUniquePkmnCount() {
    let ii = 0;
    let dex = 0;
    let amount = 0;
    let length = this.party.length;
    let array = [];
    for (; ii < length; ++ii) {
      dex = this.party[ii].dexNumber;
      if (array.indexOf(dex) === -1) {
        array.push(dex);
        amount++;
      }
    };
    return (amount);
  }

  /**
   * @return {Array}
   */
  serialize() {
    let out = [];
    let ii = 0;
    let length = this.party.length;
    for (; ii < length; ++ii) {
      out.push({
        "inventory_item_data": {
          "pokemon_data": this.party[ii].serialize()
        }
      });
    };
    return (out);
  }

}