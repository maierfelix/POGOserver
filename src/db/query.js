import CFG from "../../cfg";

/**
 * @return {String}
 */
export function getUserQuery(cmd, after) {
  return (`
    ${cmd} ${CFG.MYSQL_USERS_TABLE}
    SET
      username=?,
      email=?,
      exp=?,
      level=?,
      stardust=?,
      pokecoins=?,
      team=?,
      latitude=?,
      longitude=?,
      altitude=?,
      send_marketing_emails=?,
      send_push_notifications=?,
      skin=?,
      hair=?,
      shirt=?,
      pants=?,
      hat=?,
      shoes=?,
      eyes=?,
      gender=?,
      backpack=?
    ${after}
  `);
}

/**
 * @param {Object} obj
 * @return {Array}
 */
export function getUserQueryData(obj) {
  return ([
    obj.username,
    obj.email,
    obj.exp,
    obj.level,
    obj.stardust,
    obj.pokecoins,
    obj.team,
    // position
    obj.latitude,
    obj.longitude,
    obj.altitude,
    // contact settings
    obj.send_marketing_emails,
    obj.send_push_notifications,
    // avatar
    obj.skin,
    obj.hair,
    obj.shirt,
    obj.pants,
    obj.hat,
    obj.shoes,
    obj.eyes,
    obj.gender,
    obj.backpack,
    // WHERE
    obj.email
  ]);
}

/**
 * @return {String}
 */
export function getOwnedPkmnQuery(cmd, after) {
  return (`
    ${cmd} ${CFG.MYSQL_OWNED_PKMN_TABLE}
    SET
      owner_id=?,
      pokemon_id=?,
      cp=?,
      stamina=?,
      stamina_max=?,
      move_1=?,
      move_2=?,
      deployed_fort_id=?,
      is_egg=?,
      egg_km_walked_target=?,
      egg_km_walked_start=?,
      origin=?,
      height_m=?,
      weight_kg=?,
      individual_attack=?,
      individual_defense=?,
      individual_stamina=?,
      cp_multiplier=?,
      pokeball=?,
      captured_cell_id=?,
      battles_attacked=?,
      battles_defended=?,
      egg_incubator_id=?,
      creation_time_ms=?,
      num_upgrades=?,
      additional_cp_multiplier=?,
      favorite=?,
      nickname=?,
      from_fort=?
    ${after}
  `);
}

/**
 * @param {Object} obj
 * @return {Array}
 */
export function getOwnedPkmnQueryData(obj) {
  return ([
    obj.owner_id,
    obj.pokemon_id,
    obj.cp,
    obj.stamina,
    obj.stamina_max,
    obj.move_1,
    obj.move_2,
    obj.deployed_fort_id || "",
    obj.is_egg || 0,
    obj.egg_km_walked_target || 0,
    obj.egg_km_walked_start || 0,
    obj.origin || 0,
    obj.height_m,
    obj.weight_kg,
    obj.individual_attack,
    obj.individual_defense,
    obj.individual_stamina,
    obj.cp_multiplier,
    obj.pokeball,
    obj.captured_cell_id || 0,
    obj.battles_attacked || 0,
    obj.battles_defended || 0,
    obj.egg_incubator_id || "",
    obj.creation_time_ms,
    obj.num_upgrades || 0,
    obj.additional_cp_multiplier || 0,
    obj.favorite || 0,
    obj.nickname || "",
    obj.from_fort || 0
  ]);
}

export function getUserItemQuery(cmd, after) {
  return (`
    ${cmd} ${CFG.MYSQL_USERS_TABLE}
    SET
      item_poke_ball=?,
      item_great_ball=?,
      item_ultra_ball=?,
      item_master_ball=?,
      item_potion=?,
      item_super_potion=?,
      item_hyper_potion=?,
      item_max_potion=?,
      item_revive=?,
      item_max_revive=?,
      item_lucky_egg=?,
      item_incense_ordinary=?,
      item_incense_spicy=?,
      item_incense_cool=?,
      item_incense_floral=?,
      item_troy_disk=?,
      item_razz_berry=?,
      item_bluk_berry=?,
      item_nanab_berry=?,
      item_wepar_berry=?,
      item_pinap_berry=?,
      item_incubator_basic=?,
      item_incubator_basic_unlimited=?,
      item_pokemon_storage_upgrade=?,
      item_storage_upgrade=?
    ${after}
  `);
}

/**
 * @param {Object} obj
 * @return {Array}
 */
export function getUserItemQueryData(obj) {

  let items = [];

  for (let key in obj.items) {
    items.push(obj.items[key]);
  };

  let email = obj.email;

  obj = obj.items;

  return ([
    obj.poke_ball,
    obj.great_ball,
    obj.ultra_ball,
    obj.master_ball,
    obj.potion,
    obj.super_potion,
    obj.hyper_potion,
    obj.max_potion,
    obj.revive,
    obj.max_revive,
    obj.lucky_egg,
    obj.incense_ordinary,
    obj.incense_spicy,
    obj.incense_cool,
    obj.incense_floral,
    obj.troy_disk,
    obj.razz_berry,
    obj.bluk_berry,
    obj.nanab_berry,
    obj.wepar_berry,
    obj.pinap_berry,
    obj.incubator_basic,
    obj.incubator_basic_unlimited,
    obj.pokemon_storage_upgrade,
    obj.storage_upgrade,
    // WHERE
    email
  ]);

}