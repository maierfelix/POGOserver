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
                "level": 3,
                "experience": 2000,
                "prev_level_xp": 1000,
                "next_level_xp": 6000,
                "km_walked": 0.55459213256836,
                "pokemons_encountered": 1,
                "unique_pokedex_entries": 1,
                "pokemons_captured": 1,
                "evolutions": 0,
                "poke_stop_visits": 1,
                "pokeballs_thrown": 1,
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
          // player camera
          new proto.Inventory.InventoryItem({
            inventory_item_data: new proto.Inventory.InventoryItemData({
              "player_camera": new proto.Data.Player.PlayerCamera({
                is_default_camera: true
              })
            })
          }),
          // player currencies
          new proto.Inventory.InventoryItem({
            inventory_item_data: new proto.Inventory.InventoryItemData({
              "player_currency": new proto.Data.Player.PlayerCurrency({
                gems: 0
              })
            })
          }),
          // item
          new proto.Inventory.InventoryItem({
            inventory_item_data: new proto.Inventory.InventoryItemData({
              "item": new proto.Inventory.Item.ItemData({
                item_id: proto.Inventory.Item.ItemId.ITEM_MASTER_BALL,
                count: 4,
                unseen: false
              })
            })
          }),
          // pokedex entry
          new proto.Inventory.InventoryItem({
            inventory_item_data: new proto.Inventory.InventoryItemData({
              "pokedex_entry": new proto.Data.PokedexEntry({
                "pokemon_id": 6,
                "times_encountered": 1,
                "times_captured": 1,
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