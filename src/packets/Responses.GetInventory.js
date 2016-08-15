import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function GetInventoryData(obj) {

  // TODO: Start loading pkmn party from db

  return (
    new proto.Networking.Responses.GetInventoryResponse({
      success: true,
      inventory_delta: new proto.Inventory.InventoryDelta({
        inventory_items: [
          new proto.Inventory.InventoryItem({
            "modified_timestamp_ms": new Date().getTime() * 1e3,
            "inventory_item_data": new proto.Inventory.InventoryItemData({
              "candy": new proto.Inventory.Candy({
                "family_id": 48,
                "candy": 3
              })
            })
          }),
          new proto.Inventory.InventoryItem({
            "modified_timestamp_ms": new Date().getTime() * 1e3,
            "inventory_item_data": new proto.Inventory.InventoryItemData({
              "candy": new proto.Inventory.Candy({
                "family_id": 16,
                "candy": 3
              })
            })
          }),
          new proto.Inventory.InventoryItem({
            "modified_timestamp_ms": new Date().getTime() * 1e3,
            "inventory_item_data": new proto.Inventory.InventoryItemData({
              "player_stats": new proto.Data.Player.PlayerStats({
                "level": 3,
                "experience": 0,
                "prev_level_xp": 0,
                "next_level_xp": 0,
                "km_walked": 1.017870306968689,
                "pokemons_encountered": 6,
                "unique_pokedex_entries": 3,
                "pokemons_captured": 3,
                "evolutions": 0,
                "poke_stop_visits": 25,
                "pokeballs_thrown": 11,
                "eggs_hatched": 0,
                "big_magikarp_caught": 0,
                "battle_attack_won": 0,
                "battle_attack_total": 0,
                "battle_defended_won": 0,
                "battle_training_won": 0,
                "battle_training_total": 0,
                "prestige_raised_total": 0,
                "prestige_dropped_total": 0,
                "pokemon_deployed": 0,
                "small_rattata_caught": 0
              })
            })
          }),
          new proto.Inventory.InventoryItem({
            "modified_timestamp_ms": new Date().getTime() * 1e3,
            "inventory_item_data": new proto.Inventory.InventoryItemData({
              "item": new proto.Inventory.Item.ItemData({
                "item_id": 901,
                "count": 1,
                "unseen": true
              })
            })
          }),
          new proto.Inventory.InventoryItem({
            "modified_timestamp_ms": new Date().getTime() * 1e3,
            "inventory_item_data": new proto.Inventory.InventoryItemData({
              "pokemon_data": new proto.Data.PokemonData({
                "id": 16,
                "pokemon_id": proto.Enums.PokemonId.PIDGEY,
                "cp": 10,
                "stamina": 10,
                "stamina_max": 10,
                "move_1": 219,
                "move_2": 121,
                "deployed_fort_id": "",
                "owner_name": "",
                "is_egg": false,
                "egg_km_walked_target": 0,
                "egg_km_walked_start": 0,
                "origin": 0,
                "height_m": 0.29406625032424927,
                "weight_kg": 2.070491313934326,
                "individual_attack": 3,
                "individual_defense": 5,
                "individual_stamina": 10,
                "cp_multiplier": 0.09399999678134918,
                "pokeball": 1,
                "captured_cell_id": 2277362944,
                "battles_attacked": 0,
                "battles_defended": 0,
                "egg_incubator_id": "",
                "creation_time_ms": 9029623884583797000,
                "num_upgrades": 0,
                "additional_cp_multiplier": 0,
                "favorite": 0,
                "nickname": "",
                "from_fort": 0
              })
            })
          }),
          new proto.Inventory.InventoryItem({
            "modified_timestamp_ms": new Date().getTime() * 1e3,
            "inventory_item_data": new proto.Inventory.InventoryItemData({
              "item": new proto.Inventory.Item.ItemData({
                "item_id": 1,
                "count": 145,
                "unseen": false
              })
            })
          }),
          new proto.Inventory.InventoryItem({
            "modified_timestamp_ms": new Date().getTime() * 1e3,
            "inventory_item_data": {
              "candy": new proto.Inventory.Candy({
                "family_id": 7,
                "candy": 3
              })
            }
          }),
          new proto.Inventory.InventoryItem({
            "modified_timestamp_ms": new Date().getTime() * 1e3,
            "inventory_item_data": new proto.Inventory.InventoryItemData({
              "pokedex_entry": new proto.Data.PokedexEntry({
                "pokemon_id": 16,
                "times_encountered": 3,
                "times_captured": 1,
                "evolution_stone_pieces": 0,
                "evolution_stones": 0
              })
            })
          }),
          new proto.Inventory.InventoryItem({
            "modified_timestamp_ms": new Date().getTime() * 1e3,
            "inventory_item_data": new proto.Inventory.InventoryItemData({
              "egg_incubators": new proto.Inventory.EggIncubators({
                "egg_incubator": [
                  new proto.Inventory.EggIncubator({
                    "id": "EggIncubatorProto-2589714687259241229",
                    "item_id": 901,
                    "incubator_type": 1,
                    "uses_remaining": 0,
                    "pokemon_id": 0,
                    "start_km_walked": 0,
                    "target_km_walked": 0
                  })
                ]
              })
            })
          }),
          new proto.Inventory.InventoryItem({
            "modified_timestamp_ms": new Date().getTime() * 1e3,
            "inventory_item_data": new proto.Inventory.InventoryItemData({
              "item": new proto.Inventory.Item.ItemData({
                "item_id": 401,
                "count": 2,
                "unseen": true
              })
            })
          })
        ]
      })
    }).encode()
  );

}