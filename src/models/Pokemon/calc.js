import Settings from "../../modes";

export function calcStats() {

  let pkmnTmpl = this.getPkmnTemplate(this.dexNumber);
  let stats = pkmnTmpl.stats;

  let minIV = Settings.PKMN_SETTINGS.MIN_IV;
  let maxIV = Settings.PKMN_SETTINGS.MAX_IV;

  this.attack = stats.base_attack;
  this.defense = stats.base_defense;
  this.stamina = stats.base_stamina;

  this.ivAttack = (Math.random() * maxIV) << 0 + minIV;
  this.ivDefense = (Math.random() * maxIV) << 0 + minIV;
  this.ivStamina = (Math.random() * maxIV) << 0 + minIV;

  this.height = pkmnTmpl.pokedex_height_m + ((Math.random() * pkmnTmpl.height_std_dev) + .1);
  this.weight = pkmnTmpl.pokedex_weight_kg + ((Math.random() * pkmnTmpl.weight_std_dev) + .1);

}

export function calcMoves() {

  let pkmnTmpl = this.getPkmnTemplate(this.dexNumber);

  let weakMoves = pkmnTmpl.quick_moves;
  let strongMoves = pkmnTmpl.cinematic_moves;

  this.move1 = weakMoves[(Math.random() * weakMoves.length) << 0 + 1];
  this.move2 = strongMoves[(Math.random() * strongMoves.length) << 0 + 1];

}

/**
 * @return {Number}
 */
export function calcCP() {

  let ecpm = this.getEffectiveCpMultiplier();

  let baseAtk = this.attack;
  let baseDef = this.defense;
  let baseSta = this.stamina;

  let ivAtk = this.ivAttack;
  let ivDef = this.ivDefense;
  let ivSta = this.ivStamina;

  return (
    Math.floor(
      (baseAtk + ivAtk) *
      Math.pow(baseDef + ivDef, 0.5) *
      Math.pow(baseSta + ivSta, 0.5) *
      Math.pow(ecpm, 2) /
      10
    )
  );

}

/**
 * @return {Array}
 */
export function getCpMultipliers() {
  return (
    this.owner.info.getLevelSettings().cp_multiplier
  );
}

/**
 * @return {Number}
 */
export function getEffectiveCpMultiplier() {
  if (!Number.isInteger(this.level / 2)) {
    return (this.getHalfLevelCpMultiplier());
  }
  return (this.getCpMultipliers()[this.level / 2]);
}

/**
 * @param {Number} lvl
 * @return {Number}
 */
export function getHalfLevelCpMultiplier(lvl) {
  let next = this.getCpMultipliers()[lvl + 1];
  return (
    Math.sqrt(Math.pow(lvl, 2) + ((Math.pow(next, 2) - Math.pow(lvl, 2)) / 2))
  );
}