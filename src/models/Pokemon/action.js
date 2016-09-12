import print from "../../print";

import {
  _toCC,
} from "../../utils";

const pokename = require("pokename")();

/**
 * @return {Boolean}
 */
export function powerUp() {
  if (this.hasReachedMaxLevel()) {
    print(`${this.owner.username}'s ${this.getPkmnName()} already reached maximum level!`);
    return void 0;
  }
  let pkmnTmpl = this.getPkmnTemplate(this.dexNumber);
  let ownerStardust = this.owner.info.stardust;
  let ownerPkmnCandies = this.owner.candyBag.getCandy(this.dexNumber);
  let requiredCandies = 1;
  print(`${this.getPkmnName()} requires ${requiredCandies} candies to power up!`);
  if (ownerPkmnCandies >= requiredCandies) {
    this.level += 1;
    this.owner.candyBag.removeCandy(this.dexNumber, requiredCandies);
    return (true);
  }
  return (false);
}

/**
 * @return {Boolean}
 */
export function evolve() {
  let pkmnTmpl = this.getPkmnTemplate(this.dexNumber);
  let ownerPkmnCandies = this.owner.candyBag.getCandy(this.dexNumber);
  let candiesToEvolve = this.candiesToEvolve();
  if (ownerPkmnCandies < candiesToEvolve()) {
    return print(`You have ${ownerPkmnCandies}/${candiesToEvolve} candies to evolve ${this.getPkmnName()}!`, 31);
  }
  let evolutions = pkmnTmpl.evolution_ids;
  if (this.hasEvolution() && evolutions.length <= 1) {
    let result = this.evolveInto(evolutions[0]);
    this.owner.candyBag.removeCandy(this.dexNumber, pkmnTmpl.candy_to_evolve);
    return (result);
  }
  else {
    print(`Evolving this pokemon isnt supported yet!`, 31);
  }
  return (false);
}

/**
 * @param {String} ev
 * @return {Boolean}
 */
export function evolveInto(ev) {
  let evName = _toCC(ev);
  let evId = pokename.getPokemonIdByName(evName);
  if (evId <= 0) {
    print(`Failed at retrieving id for pokemon ${ev}`, 31);
    return (false);
  }
  let evTmpl = this.getPkmnTemplate(evId);
  print(`${this.owner.username} successfully evolved ${this.getPkmnName()} into ${evName}`);
  return (true);
}