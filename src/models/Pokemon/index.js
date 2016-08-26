import pokename from "pokename";

import MapObject from "../World/MapObject";

import {
  validName
} from "../../utils";

/**
 * @class Pokemon
 */
export default class Pokemon extends MapObject {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    this.id = 0;
    this.dexNumber = 0;

    this.owner = null;

    this.level = 0;

    this.cp = 0;
    this.cpMultiplier = 0;
    this.addCpMultiplier = 0;

    this.stamina = 0;
    this.staminaMax = 0;

    this.move1 = 0;
    this.move2 = 0;

    this.attack = 0;
    this.defence = 0;

    this.height = 0;
    this.weight = 0;

    this.ivAttack = 0;
    this.ivDefense = 0;
    this.ivStamina = 0;

    this.nickname = null;

    this.favorite = 0;

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
   * @param {Boolean} truth
   */
  setFavorite(truth) {
    this.favorite = !!truth;
  }

  /**
   * @param {String} name
   */
  setNickname(name) {
    if (!validName(name)) return void 0;
    this.nickname = name;
  }

  /**
   * @param {Number} dex
   * @return {Object}
   */
  getPkmnTemplate(dex) {
    let name = pokename.getPokemonNameById(dex);
    return (this.owner.gameMaster.pokemon[name]);
  }

  upgradePkmn() {
    let pkmnTmpl = this.getPkmnTemplate(this.dexNumber);
    let ownerCandies = this.owner.bag.getCandyByDexNumber(this.dexNumber);
    if (ownerCandies >= pkmnTmpl.CandyToEvolve) {
      this.owner.bag.setCandyByDex(ownerCandies - pkmnTmpl.CandyToEvolve);
      this.evolveTo(pkmnTmpl.Evolution);
    }
  }

  /**
   * @param {Number} dex
   */
  evolveTo(dex) {
    console.log("EVOLVE TO: ", dex);
  }

  /**
   * @return {Object}
   */
  getPokemonData() {
    return ({
      pokemon_id: this.dexNumber,
      cp: this.cp,
      stamina: this.stamina,
      stamina_max: this.stamina_max,
      move_1: this.move_1,
      move_2: this.move_2,
      height_m: this.height,
      weight_kg: this.weight,
      individual_attack: this.ivAttack,
      individual_defense: this.ivDefense,
      individual_stamina: this.ivStamina,
      cp_multiplier: this.cpMultiplier
    });
  }

}