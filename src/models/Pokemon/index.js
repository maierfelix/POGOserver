import MapObject from "../World/MapObject";

import { GAME_MASTER } from "../../shared";

import {
  _toCC,
  inherit,
  validName
} from "../../utils";

import print from "../../print";

import * as _calc from "./calc";

const pokename = require("pokename")();

/**
 * @class Pokemon
 */
export default class Pokemon extends MapObject {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    super(null);

    this.id = 0;
    this.dexNumber = 0;

    this.owner = null;

    this.level = 0;
    this.capturedLevel = 0;

    this.cp = 0;
    this.cpMultiplier = 0;
    this.addCpMultiplier = 0;

    this.move1 = 0;
    this.move2 = 0;

    this.attack = 0;
    this.defense = 0;
    this.stamina = 0;

    this.height = 0;
    this.weight = 0;

    this.ivAttack = 0;
    this.ivDefense = 0;
    this.ivStamina = 0;

    this.staminaMax = 0;

    this.nickname = null;

    this.pokeball = null;

    this.favorite = 0;

    this.init(obj);

    this.calcStats();
    this.calcMoves();

    this.powerUp();
    this.evolve();

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
    let tmpl = GAME_MASTER.getPokemonTmplByDex(dex);
    return (tmpl);
  }

  /**
   * @return {String}
   */
  getPkmnName() {
    return (
      pokename.getPokemonNameById(this.dexNumber)
    );
  }

  /**
   * @return {Boolean}
   */
  hasEvolution() {
    let pkmnTmpl = this.getPkmnTemplate(this.dexNumber);
    return (
      pkmnTmpl.evolution_ids.length >= 1
    );
  }

  /**
   * @return {Number}
   */
  getCandiesToEvolve() {
    let pkmnTmpl = this.getPkmnTemplate(this.dexNumber);
    return (pkmnTmpl.candy_to_evolve << 0);
  }

  powerUp() {
    let pkmnTmpl = this.getPkmnTemplate(this.dexNumber);
    let ownerStardust = this.owner.info.stardust;
    let ownerPkmnCandies = this.owner.candyBag.getCandy(this.dexNumber);
    let requiredCandies = this.getCandiesToEvolve();
    let requiredStardust = this.xxx();
  }

  evolve() {
    let pkmnTmpl = this.getPkmnTemplate(this.dexNumber);
    let ownerPkmnCandies = this.owner.candyBag.getCandy(this.dexNumber);
    if (ownerPkmnCandies < this.getCandiesToEvolve()) return void 0;
    let evolutions = pkmnTmpl.evolution_ids;
    if (this.hasEvolution() && evolutions.length <= 1) {
      this.evolveInto(evolutions[0]);
      this.owner.candyBag.removeCandy(this.dexNumber, pkmnTmpl.candy_to_evolve);
    }
    else {
      print(`Evolving this pokemon isnt supported yet!`, 31);
    }
  }

  /**
   * @param {String} ev
   */
  evolveInto(ev) {
    let evName = _toCC(ev);
    let evId = pokename.getPokemonIdByName(evName);
    if (evId <= 0) return print(`Failed at retrieving id for pokemon ${ev}`, 31);
    let evTmpl = this.getPkmnTemplate(evId);
    print(`${this.owner.username} successfully evolved ${this.getPkmnName()} into ${evName}`);
  }

  /**
   * @return {Object}
   */
  serialize() {
    return ({
      id: 1,
      pokemon_id: this.dexNumber,
      cp: this.cp,
      stamina: this.stamina,
      stamina_max: this.staminaMax,
      move_1: this.move1,
      move_2: this.move2,
      height_m: this.height,
      weight_kg: this.weight,
      individual_attack: this.ivAttack,
      individual_defense: this.ivDefense,
      individual_stamina: this.ivStamina,
      cp_multiplier: this.cpMultiplier,
      pokeball: "ITEM_POKE_BALL",
      captured_cell_id: "1337",
      creation_time_ms: +new Date() - 1e3,
      favorite: this.favorite
    });
  }

  /**
   * @return {Object}
   */
  querify() {
    return ({

    });
  }

}

inherit(Pokemon, _calc);