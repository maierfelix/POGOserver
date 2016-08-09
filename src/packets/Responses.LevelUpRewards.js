import proto from "../proto";

import { GetPlayer } from "./";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function LevelUpRewards(obj) {

  return (
    new proto.Networking.Responses.LevelUpRewardsResponse({
      result: proto.Networking.Responses.LevelUpRewardsResponse.Result.SUCCESS,
      items_awarded: [
        new proto.Inventory.Item.ItemAward({
          item_id: proto.Inventory.Item.ItemId.ITEM_GREAT_BALL,
          item_count: 2
        })
      ],
      items_unlocked: []
    }).encode()
  );

}