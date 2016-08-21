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
    item_item_storage_upgrade=?
    ${after}
  `);
}

/**
 * @param {Object} obj
 * @return {Array}
 */
export function getUserItemQueryData(obj) {

  console.log(obj);

  return ([]);

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
    // where
    obj.email
  ]);

}