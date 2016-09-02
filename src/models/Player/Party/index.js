import Pokemon from "../../Pokemon";

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

    this.addPkmn({
      dexNumber: 4,
      cp: 100,
      stamina: 10,
      staminaMax: 20,
      move1: "TACKLE",
      move2: "SIGNAL BEAM",
      height: 0.3,
      weight: 0.55,
      ivAttack: 10,
      ivDefense: 12,
      ivStamina: 15,
      cpMultiplier: 0.333,
      pokeball: "ITEM_POKE_BALL",
      favorite: 0
    });

  }

  /**
   * @param {Object} obj
   */
  addPkmn(obj) {
    if (!obj.owner) obj.owner = this.player;
    if (!(obj instanceof Pokemon)) {
      this.party.push(new Pokemon(obj));
    }
    else this.party.push(obj);
  }

  /**
   * @param {Number} id
   * @return {Number}
   */
  getPkmnIndexById(id) {
    for (let ii = 0; ii < this.party.length; ++ii) {
      if (this.party[ii].id === id) return (ii);
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
   * @return {Pokemon}
   */
  deletePkmn(id) {
    let index = this.getPkmnIndexById(id);
    let pkmn = this.party[index];
    if (pkmn) this.party.splice(index, 1)[0];
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