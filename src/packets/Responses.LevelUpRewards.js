import proto from "../proto";

import { GetPlayer } from "./";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function LevelUpRewards(obj) {

  return (
    new proto.Networking.Responses.LevelUpRewardsResponse({
      result: 2,
      items_awarded: [],
      items_unlocked: []
    }).encode()
  );

}