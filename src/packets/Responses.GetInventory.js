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
          // player stats
          new proto.Inventory.InventoryItem({
            inventory_item_data: new proto.Inventory.InventoryItemData({
              "player_stats": new proto.Data.Player.PlayerStats({
                "level": 98,
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
                pokemon_id: 19,
                cp: 277,
                stamina: 41,
                stamina_max: 41,
                move_1: 221,
                move_2: 26,
                height_m: 0.22802678267819977,
                weight_kg: 1.3452539511871338,
                individual_attack: 9,
                individual_defense: 13,
                individual_stamina: 14,
                cp_multiplier: 0.5663545199394226,
                additional_cp_multiplier: 0,
                favorite: 0,
                nickname: "BauerVomLande",
                owner_name: "Administrator",
                origin: 0,
                is_egg: false
              })
            })
          })
        ]
      })
    }).encode()
  );

}