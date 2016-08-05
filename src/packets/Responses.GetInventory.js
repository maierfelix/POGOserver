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
        original_timestamp_ms: new Date().getTime * 1000,
        new_timestamp_ms: new Date().getTime * 1000,
        inventory_items: [
          new proto.Inventory.InventoryItem({
            inventory_item_data: new proto.Inventory.InventoryItemData({
              pokemon_data: new proto.Data.PokemonData({
                id: 123781297398,
                pokemon_id: 25,
                cp: 10000000000,
                is_egg: false,
                height_m: 100,
                weight_kg: 1,
                move_1: 219,
                move_2: 26,
                deployed_fort_id: 0,
                owner_name: "",
                origin: 0,
                individual_attack: 100,
                individual_defense: 100,
                individual_stamina: 100,
                cp_multiplier: 100,
                pokeball: 1,
                creation_time_ms: new Date().getTime() * 1000
              })
            })
          }),
          new proto.Inventory.InventoryItem({
            inventory_item_data: new proto.Inventory.InventoryItemData({
              item: new proto.Inventory.Item({
                item_id: 4,
                count: 1000
              })
            })
          })
        ]
      })
    }).encode()
  );

}