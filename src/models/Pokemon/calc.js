import Settings from "../../modes";

/**
 * @param {Player} owner
 */
export function calcStats(owner) {

  let pkmnTmpl = this.getPkmnTemplate(this.dexNumber);
  let stats = pkmnTmpl.stats;

  let minIV = Settings.PKMN_SETTINGS.MIN_IV;
  let maxIV = Settings.PKMN_SETTINGS.MAX_IV;

  this.attack = stats.base_attack;
  this.defense = stats.base_defense;
  this.stamina = stats.base_stamina;
  this.staminaMax = this.stamina;

  this.ivAttack = ~~(Math.random() * maxIV) + minIV;
  this.ivDefense = ~~(Math.random() * maxIV) + minIV;
  this.ivStamina = ~~(Math.random() * maxIV) + minIV;

  this.height = pkmnTmpl.pokedex_height_m + ((Math.random() * pkmnTmpl.height_std_dev) + .1);
  this.weight = pkmnTmpl.pokedex_weight_kg + ((Math.random() * pkmnTmpl.weight_std_dev) + .1);

  if (owner !== null) {
    this.cp = Math.floor(Math.random() * this.calcCP(owner)) + 16;
  }

  this.calcMoves();

}

export function calcMoves() {

  let pkmnTmpl = this.getPkmnTemplate(this.dexNumber);

  let weakMoves = pkmnTmpl.quick_moves;
  let strongMoves = pkmnTmpl.cinematic_moves;

  this.move1 = weakMoves[(Math.random() * weakMoves.length) << 0];
  this.move2 = strongMoves[(Math.random() * strongMoves.length) << 0];

}

/**
 * @param {Player} owner
 * @return {Number}
 */
export function calcCP(owner) {

  let levelSettings = owner.info.getLevelSettings();
  let ecpm = levelSettings.cp_multiplier[owner.info.level - 1];

  let atk = (this.attack + this.ivAttack) * ecpm;
  let def = (this.defense + this.ivDefense) * ecpm;
  let sta = (this.stamina + this.ivStamina) * ecpm;

  return (
    Math.max(10, Math.floor(Math.sqrt(atk * atk * def * sta) / 10))
  );

}

/**
 * @param {Number} lvl
 * @return {Number}
 */
export function getHalfLevelCPMultiplier(lvl) {
  let next = this.getCPMultipliers()[lvl + 1];
  return (
    Math.sqrt(Math.pow(lvl, 2) + ((Math.pow(next, 2) - Math.pow(lvl, 2)) / 2))
  );
}