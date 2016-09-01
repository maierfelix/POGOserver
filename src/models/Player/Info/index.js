import { GAME_MASTER } from "../../../shared";

import print from "../../../print";

/**
 * @class Info
 */
export default class Info {

  /** @constructor */
  constructor() {

    this.lvl = 1;

    this.team = "NEUTRAL";

    this.exp = this.getLevelExp(this.lvl);
    this.prevLvlExp = this.getLevelExp(this.lvl);
    this.nextLvlExp = this.getLevelExp(this.lvl + 1);

    this.levelReward = false;

    this.kmWalked = 0;
    this.pkmnEncountered = 0;
    this.uniquePokedexEntries = 0;
    this.pkmnCaptured = 0;
    this.pokeStopVisits = 0;
    this.pokeballsThrown = 0;
    this.eggsHatched = 0;
    this.bigMagikarpCaught = 0;
    this.pkmnDeployed = 0;

    this.maxPkmnStorage = 250;
    this.maxItemStorage = 350;

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
      let currentLevelExp = this.getLevelExp(this.lvl);
      let nextLevelExp = this.getLevelExp(this.lvl + 1);
      let leftExp = nextLevelExp - this.exp;
      this.levelReward = false;
      if (this.exp + exp >= nextLevelExp) {
        this.lvl += 1;
        this.prevLvlExp = nextLevelExp;
        this.nextLvlExp = this.getLevelExp(this.lvl + 1);
        this.exp += leftExp + 1;
        this.levelReward = true;
        this.upgradeExp(exp - leftExp);
      }
      else {
        this.exp += exp;
      }
    }
  }

  maxLevelReached() {
    return (
      this.lvl + 1 >= this.getMaximumLevel()
    );
  }

  serialize() {
    return ({
      level: this.lvl,
      experience: this.exp,
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
    });
  }

}