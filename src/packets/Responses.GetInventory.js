import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

let isFirst = false;

/**
 * @param {Object} data
 * @return {Object}
 */
export default function GetInventoryData(player) {

  let entries = [];

  entries.push({
    "modified_timestamp_ms": new Date().getTime() - 1e3,
    "inventory_item_data": {
      "player_stats": {
        "level": player.level,
        "experience": player.exp,
        "prev_level_xp": "21000",
        "next_level_xp": "36000",
        "km_walked": 3.921541213989258,
        "pokemons_encountered": 75,
        "unique_pokedex_entries": 25,
        "pokemons_captured": 71,
        "poke_stop_visits": 123,
        "pokeballs_thrown": 74,
        "eggs_hatched": 1,
        "big_magikarp_caught": 1,
        "pokemon_deployed": 1,
        "pokemon_caught_by_type": {
          "type": "Buffer",
          "data": [
            0,
            24,
            0,
            26,
            20,
            1,
            0,
            14,
            0,
            0,
            1,
            14,
            3,
            0,
            1,
            0,
            0,
            0,
            3
          ]
        }
      }
    }
  });

  for (let key in player.items) {
    let amount = parseInt(player.items[key]);
    if (amount > 0) {
      entries.push({
        "modified_timestamp_ms": new Date().getTime() - 1e3,
        "inventory_item_data": {
          "item": {
            "item_id": "ITEM_" + key.toUpperCase(),
            "count": amount
          }
        }
      });
    }
  };

  let party = player.party;

  for (let pkmn of party) {
    entries.push({
      "inventory_item_data": {
        "pokemon_data": {
          "id": pkmn.id,
          "pokemon_id": pkmn.pokemon_id,
          "cp": pkmn.cp,
          "stamina": pkmn.stamina,
          "stamina_max": pkmn.stamina_max,
          "move_1": pkmn.move_1,
          "move_2": pkmn.move_2,
          "height_m": pkmn.height_m,
          "weight_kg": pkmn.weight_kg,
          "individual_attack": pkmn.individual_attack,
          "individual_defense": pkmn.individual_defense,
          "individual_stamina": pkmn.individual_stamina,
          "cp_multiplier": pkmn.cp_multiplier,
          "pokeball": pkmn.pokeball,
          "captured_cell_id": pkmn.captured_cell_id,
          "creation_time_ms": pkmn.creation_time_ms
        }
      }
    });
  };

  let buffer = ({
    "success": true,
    "inventory_delta": {
      "new_timestamp_ms": new Date().getTime() - 1e3,
      "inventory_items": entries
    }
  });

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetInventoryResponse"));

}