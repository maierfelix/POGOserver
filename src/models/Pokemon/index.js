import MapObject from "../World/MapObject";

import { GAME_MASTER } from "../../shared";

import Settings from "../../modes";

import {
  _toCC,
  inherit,
  validName
} from "../../utils";

import print from "../../print";

import * as _calc from "./calc";
import * as _actions from "./action";

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

    this._level = 1;
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

    this.favorite = 0;

    this.owner = null;
    this.nickname = null;
    this.pokeball = null;

    this.isWild = false;

    this.init(obj);

  }

  get level() {
    return (this._level + 1);
  }
  set level(value) {
    this._level = parseFloat(value);
    this.calcStats();
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
    if (obj.isWild) {
      this.isWild = true;
    }
    else {
      this.calcStats();
      this.calcMoves();
    }
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
  candiesToEvolve() {
    let pkmnTmpl = this.getPkmnTemplate(this.dexNumber);
    return (pkmnTmpl.candy_to_evolve << 0);
  }

  /**
   * @return {Number}
   */
  candiesToPowerUp() {
    return (1337);
  }

  /**
   * @return {Boolean}
   */
  hasReachedMaxLevel() {
    return (
      this.level > this.owner.info.getMaximumLevel() * 2
    );
  }

  /**
   * @return {Object}
   */
  serialize() {
    return ({
      id: this.id,
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
   * @return {Array}
   */
  querify() {
    return ([

    ]);
  }

}

inherit(Pokemon, _calc);
inherit(Pokemon, _actions);