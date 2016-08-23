import CFG from "../../cfg";

import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function CatchPokemon(encounter, player, req) {

  let obj = {
    "owner_id": -1,
    "encounter_id": encounter.encounter_id,
    "spawn_point_id": "87bdcd88cb5",
    "captured_cell_id": "9781199952939057152",
    pokemon_id: encounter.pokemon_id,
    cp: encounter.cp,
    "move_1": "BUG_BITE_FAST",
    "move_2": "STRUGGLE",
    "stamina": 10,
    "stamina_max": 10,
    height_m: 0.30962005257606506,
    weight_kg: 3.3212273120880127,
    "pokeball": "ITEM_POKE_BALL",
    "creation_time_ms": new Date().getTime(),
    "cp_multiplier": 0.16639786958694458,
    individual_attack: 7,
    individual_defense: 13,
    individual_stamina: 3
  };

  if (!req.hit_pokemon) {
    return ({
      status: 'CATCH_MISSED'
    });
  } else {
    return ({
      pkmn: obj,
      buffer: {
        status: 'CATCH_SUCCESS',
        captured_pokemon_id: encounter.encounter_id,
        capture_award: {
          activity_type: ['ACTIVITY_CATCH_POKEMON'],
          xp: [100],
          candy: [3],
          stardust: [100]
        }
      }
    });
  }

}