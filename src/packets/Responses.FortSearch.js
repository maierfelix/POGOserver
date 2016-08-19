import CFG from "../../cfg";

import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function FortSearch(obj) {

  return (
    new proto.Networking.Responses.FortSearchResponse({
      result: proto.Networking.Responses.FortSearchResponse.Result.SUCCESS,
      items_awarded: [
        new proto.Inventory.Item.ItemAward({
          item_id: proto.Inventory.Item.ItemId.ITEM_MASTER_BALL,
          item_count: 3
        }),
        new proto.Inventory.Item.ItemAward({
          item_id: proto.Inventory.Item.ItemId.ITEM_ULTRA_BALL,
          item_count: 2
        })
      ],
      gems_awarded: 0,
      pokemon_data_egg: null,
      experience_awarded: 99999,
      cooldown_complete_timestamp_ms: 1470174535972,
      chain_hack_sequence_number: 0
    }).encode()
  );

}