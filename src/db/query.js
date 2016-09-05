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
      candies=?,
      items=?,
      avatar=?,
      tutorial=?
    ${after}
  `);
}

/**
 * @param {Player} player
 * @return {Array}
 */
export function getPlayerQueryData(player) {
  return ([
    player.username,
    player.email,
    player.exp,
    player.level,
    player.stardust,
    player.pokecoins,
    player.team,
    // position
    player.latitude,
    player.longitude,
    player.altitude,
    // contact settings
    player.send_marketing_emails,
    player.send_push_notifications,
    // json
    player.candies.serialize(),
    player.items.serialize(),
    player.avatar.serialize(),
    player.tutorial.serialize()
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