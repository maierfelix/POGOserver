import proto from "../proto";

import CFG from "../../cfg";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function SfidaActionLog(obj) {

  return (
    new proto.Networking.Responses.SfidaActionLogResponse({ 
      result: proto.Networking.Responses.SfidaActionLogResponse.Result.SUCCESS,
      log_entries: [
        new proto.Data.Logs.ActionLogEntry({
          timestamp_ms: (new Date().getTime() - 1e4) * 1e3,
          sfida: false,
          catch_pokemon: null,
          fort_search: new proto.Data.Logs.FortSearchLogEntry({
            result: proto.Data.Logs.FortSearchLogEntry.Result.SUCCESS,
            fort_id: "",
            items: [
              new proto.Inventory.Item.ItemData({
                item_id: proto.Inventory.Item.ItemId.ITEM_MASTER_BALL,
                count: 2,
                unseen: false
              }),
              new proto.Inventory.Item.ItemData({
                item_id: proto.Inventory.Item.ItemId.ITEM_ULTRA_BALL,
                count: 2,
                unseen: false
              })
            ]
          })
        })
        /*,
        new proto.Data.Logs.ActionLogEntry({
          timestamp_ms: (new Date().getTime() - 1e3) * 1e3,
          catch_pokemon: new proto.Data.Logs.CatchPokemonLogEntry({
            result: proto.Data.Logs.CatchPokemonLogEntry.Result.SUCCESS,
            pokemon_id: proto.Enums.PokemonId.PIDGEY,
            combat_points: 352
          })
        }),
        new proto.Data.Logs.ActionLogEntry({
          timestamp_ms: (new Date().getTime() - 1e2) * 1e3,
          catch_pokemon: new proto.Data.Logs.CatchPokemonLogEntry({
            result: proto.Data.Logs.CatchPokemonLogEntry.Result.SUCCESS,
            pokemon_id: proto.Enums.PokemonId.CHARIZARD,
            combat_points: 963
          })
        })*/
      ]
    }).encode()
  );

}