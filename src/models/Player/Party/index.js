import Pokemon from "../../Pokemon";

/**
 * @class Party
 */
export default class Party {

  /** @constructor */
  constructor() {

    this.party = [];

  }

  addPkmn(obj) {
    console.log(obj);
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

}