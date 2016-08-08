import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function GetInventoryData(obj) {

  return (
    new proto.Networking.Responses.GetInventoryResponse({
      success: true,
      inventory_delta: new proto.Inventory.InventoryDelta({
        inventory_items: [
          // player stats
          new proto.Inventory.InventoryItem({
            inventory_item_data: new proto.Inventory.InventoryItemData({
              "player_stats": new proto.Data.Player.PlayerStats({
                "level": 99,
                "experience": 1304364,
                "prev_level_xp": 900000,
                "next_level_xp": 1350000,
                "km_walked": 54.55459213256836,
                "pokemons_encountered": 3942,
                "unique_pokedex_entries": 93,
                "pokemons_captured": 3569,
                "evolutions": 782,
                "poke_stop_visits": 3113,
                "pokeballs_thrown": 5783,
                "eggs_hatched": 27,
                "big_magikarp_caught": 11,
                "battle_attack_won": 36,
                "battle_attack_total": 44,
                "battle_defended_won": 0,
                "battle_training_won": 1,
                "battle_training_total": 2,
                "prestige_raised_total": 190,
                "prestige_dropped_total": 27000,
                "pokemon_deployed": 2,
                "small_rattata_caught": 79
              })
            })
          }),
          // pokedex entry
          new proto.Inventory.InventoryItem({
            inventory_item_data: new proto.Inventory.InventoryItemData({
              "pokedex_entry": new proto.Data.PokedexEntry({
                "pokemon_id": 147,
                "times_encountered": 7,
                "times_captured": 6,
                "evolution_stone_pieces": 0,
                "evolution_stones": 0
              })
            })
          }),
          // pokemon
          new proto.Inventory.InventoryItem({
            inventory_item_data: new proto.Inventory.InventoryItemData({
              "pokemon_data": new proto.Data.PokemonData({
                "id": 151,
                "pokemon_id": 151,
                "cp": 9454,
                "stamina": 53,
                "stamina_max": 53,
                "move_1": 221,
                "move_2": 80,
                "deployed_fort_id": "",
                "owner_name": "",
                "is_egg": false,
                "egg_km_walked_target": 0,
                "egg_km_walked_start": 0,
                "origin": 0,
                "height_m": 0.3461824357509613,
                "weight_kg": 2.0753486156463623,
                "individual_attack": 2,
                "individual_defense": 0,
                "individual_stamina": 9,
                "cp_multiplier": 0.5974000096321106,
                "pokeball": 2,
                "battles_attacked": 0,
                "battles_defended": 0,
                "egg_incubator_id": "",
                "creation_time_ms": new Date().getTime() * 1000,
                "num_upgrades": 0,
                "additional_cp_multiplier": 0,
                "favorite": 0,
                "nickname": "Ad°0lf_fH$TL3R",
                "from_fort": 0
              })
            })
          })
        ]
      })
    }).encode()
  );

}