import { GAME_MASTER } from "../../../shared";

import print from "../../../print";

import ENUM from "../../../enum";

/**
 * @class Info
 */
export default class Info {

  /**
   * @param {Player} player
   * @constructor
   */
  constructor(player) {

    this.player = player;

    this.stardust = 0;
    this.pokecoins = 0;

    this._exp = 0;
    this._team = 0;
    this._level = 0;

    this.prevLvlExp = 0;
    this.nextLvlExp = 0;

    this.levelReward = false;

    this.kmWalked = 0;
    this.pkmnEncountered = 1;
    this.uniquePokedexEntries = 1;
    this.pkmnCaptured = 1;
    this.pokeStopVisits = 2;
    this.pokeballsThrown = 3;
    this.eggsHatched = 0;
    this.bigMagikarpCaught = 0;
    this.pkmnDeployed = 0;

    this.maxPkmnStorage = 250;
    this.maxItemStorage = 350;

  }

  get exp() {
    return (this._exp);
  }
  set exp(value) {
    this._exp = value;
    this.updatePrevNextExp();
  }

  get level() {
    return (this._level);
  }
  set level(value) {
    this._level = value;
    this.updatePrevNextExp();
  }

  get team() {
    return (ENUM.getNameById(ENUM.TEAM, this._team));
  }
  set team(value) {
    this._team = value << 0;
  }

  updatePrevNextExp() {
    this.prevLvlExp = this.getLevelExp(this.level);
    this.nextLvlExp = this.getLevelExp(this.level + 1);
  }

  upgradeLevel() {

  }

  getLevelSettings() {
    return (
      GAME_MASTER.settings.PLAYER_LEVEL_SETTINGS.player_level
    );
  }

  getMaximumLevel() {
    return (
      this.getLevelSettings().required_experience.length
    );
  }

  getCurrentLevel() {
    let levels = this.getLevelSettings().required_experience;
    for (let key in levels) {
      if (levels[key] << 0 === this.nextLvlExp) {
        return (key << 0);
      }
    };
    return (1);
  }

  getLevelExp(lvl) {
    return (
      this.getLevelSettings().required_experience[lvl - 1]
    );
  }

  /**
   * @param {Number} exp
   */
  upgradeExp(exp) {
    if (!this.maxLevelReached()) {
      let currentLevelExp = this.getLevelExp(this.level);
      let nextLevelExp = this.getLevelExp(this.level + 1);
      let leftExp = nextLevelExp - this.exp;
      this.levelReward = false;
      if (this.exp + exp >= nextLevelExp) {
        this.level += 1;
        this.prevLvlExp = nextLevelExp;
        this.nextLvlExp = this.getLevelExp(this.level + 1);
        this.exp += leftExp + 1;
        this.levelReward = true;
        this.upgradeExp(exp - leftExp);
      }
      else {
        this.exp += exp;
      }
    }
  }

  /**
   * @return {Boolean}
   */
  maxLevelReached() {
    return (
      this.level + 1 >= this.getMaximumLevel()
    );
  }

  /**
   * @return {Object}
   */
  serialize() {
    return ({
      modified_timestamp_ms: +new Date(),
      inventory_item_data: {
        player_stats: {
          level: this.level,
          experience: this.exp,
          prev_level_xp: this.prevLvlExp,
          next_level_xp: this.nextLvlExp,
          km_walked: this.kmWalked,
          pokemons_encountered: this.pkmnEncountered,
          unique_pokedex_entries: this.uniquePokedexEntries,
          pokemons_captured: this.pkmnCaptured,
          poke_stop_visits: this.pokeStopVisits,
          pokeballs_thrown: this.pokeballsThrown,
          eggs_hatched: this.eggsHatched,
          big_magikarp_caught: this.bigMagikarpCaught,
          pokemon_deployed: this.pkmnDeployed
        }
      }
    });
  }

}