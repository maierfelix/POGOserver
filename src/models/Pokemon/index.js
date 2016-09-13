import MapObject from "../World/MapObject";

import { GAME_MASTER } from "../../shared";

import Settings from "../../modes";

import {
  _toCC,
  inherit,
  deCapitalize,
  validUsername
} from "../../utils";

import print from "../../print";

import CFG from "../../../cfg";
import ENUM from "../../enum";

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

    this.dexNumber = 0;

    this._level = 1;
    this.capturedLevel = 0;

    this.cp = 0;
    this.cpMultiplier = Math.random() + 1.0;
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
    this.isOwned = false;

    this.spawnPoint = null;

    this.init(obj);

  }

  get level() {
    return (this._level + 1);
  }
  set level(value) {
    this._level = parseFloat(value);
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
      else if (this.hasOwnProperty(this.normalizeKey(key))) {
        this[this.normalizeKey(key)] = obj[key];
      }
      else if (key === "id") {
        this.uid = parseInt(obj[key]);
      }
      else if (key === "move_1") {
        this.move1 = obj[key];
      }
      else if (key === "move_2") {
        this.move2 = obj[key];
      }
      else if (key === "height_m") {
        this.height = obj[key];
      }
      else if (key === "weight_kg") {
        this.weight = obj[key];
      }
      else if (key === "individual_attack") {
        this.ivAttack = obj[key];
      }
      else if (key === "individual_defense") {
        this.ivDefense = obj[key];
      }
      else if (key === "individual_stamina") {
        this.ivStamina = obj[key];
      }
    };
    if (!obj.isWild && !obj.isOwned) this.calcStats(this.owner);
  }

  /**
   * @param {String} key
   * @return {String}
   */
  normalizeKey(key) {
    return (
      deCapitalize(_toCC(key))
    );
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
    if (validUsername(name)) {
      this.nickname = name;
    }
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
   * @param {Number} dex
   * @return {String}
   */
  getPkmnFamily(dex) {
    return (
      this.getPkmnTemplate(dex).family_id
    );
  }

  /**
   * @param {Number} amount
   */
  addCandies(amount) {
    let family = this.getPkmnFamily(this.dexNumber);
    let id = ENUM.getIdByName(ENUM.POKEMON_FAMILY, family) << 0;
    if (this.owner) this.owner.candyBag.addCandy(id, parseInt(amount));
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
   * @return {Boolean}
   */
  hasReachedMaxLevel() {
    return (
      this.level > this.owner.info.getMaximumLevel() * 2
    );
  }

  insertIntoDatabase() {
    let query = `
      INSERT INTO ${CFG.MYSQL_OWNED_PKMN_TABLE} SET
        owner_id=?,
        dex_number=?,
        cp=?,
        stamina=?,
        stamina_max=?,
        move_1=?,
        move_2=?,
        height_m=?,
        weight_kg=?,
        individual_attack=?,
        individual_defense=?,
        individual_stamina=?,
        cp_multiplier=?,
        pokeball=?,
        favorite=?,
        nickname=?
    `;
    let data = [
      this.owner.uid, this.dexNumber, this.cp,
      this.stamina, this.staminaMax,
      this.move1, this.move2,
      this.height, this.weight,
      this.ivAttack, this.ivDefense, this.ivStamina,
      this.cpMultiplier, this.pokeball, this.favorite, this.nickname || ""
    ];
    return new Promise((resolve) => {
      this.owner.world.db.query(query, data, (e, res) => {
        if (e) return print(e, 31);
        resolve(res.insertId);
      });
    });
  }

  deleteFromDatabase() {
    let query = `DELETE FROM ${CFG.MYSQL_OWNED_PKMN_TABLE} WHERE id=? AND owner_id=? LIMIT 1`;
    return new Promise((resolve) => {
      this.owner.world.db.query(query, [this.uid, this.owner.uid], (e, res) => {
        if (e) return print(e, 31);
        resolve(res);
      });
    });
  }

  /**
   * @return {Object}
   */
  serialize() {
    return ({
      id: this.uid,
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
      creation_time_ms: +new Date(),
      favorite: this.favorite,
      nickname: this.nickname
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