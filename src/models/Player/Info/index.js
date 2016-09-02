import { GAME_MASTER } from "../../../shared";

import print from "../../../print";

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

    this.lvl = 1;

    this.stardust = 0;
    this.pokecoins = 0;

    this.team = "NEUTRAL";

    this.exp = this.getLevelExp(this.lvl);
    this.prevLvlExp = this.getLevelExp(this.lvl);
    this.nextLvlExp = this.getLevelExp(this.lvl + 1);

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

  /**
   * @return {Boolean}
   */
  maxLevelReached() {
    return (
      this.lvl + 1 >= this.getMaximumLevel()
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
          pokemon_deployed: this.pkmnDeployed,
          pokemon_caught_by_type: {
            0: 0,
            1: 1,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0
          }
        }
      }
    });
  }

}