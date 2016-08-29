/**
 * @class Info
 */
export default class Info {

  /** @constructor */
  constructor() {

    this.lvl = 0;

    this.team = 0;

    this.exp = 0;
    this.prevLvlExp = 0;
    this.nextLvlExp = 0;

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
      this.owner.gameMaster("PLAYER_LEVEL_SETTINGS")
    );
  }

  getMaximumLevel() {
    return (
      Object.keys(this.getLevelSettings().player_level).length
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

  /**
   * @param {Number} exp
   */
  upgradeExp(exp) {
    let levels = this.getLevelSettings().required_experience;
    let maxLevel = this.getMaximumLevel();
    let currentLevel = this.getCurrentLevel();
    if (currentLevel + 1 <= maxLevel) {
      this.lvl += 1;
      this.exp += exp;
      this.prevLvlExp = levels[this.lvl - 1];
      this.nextLvlExp = levels[this.lvl + 1];
    }
    else {
      this.exp += exp;
    }
  }

  serialize() {
    return ({
      level: this.lvl,
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
    });
  }

}