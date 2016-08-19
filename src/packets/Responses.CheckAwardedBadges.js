import CFG from "../../cfg";

import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function CheckAwardedBadges(obj) {

  return (
    new proto.Networking.Responses.CheckAwardedBadgesResponse({
      success: true,
      awarded_badges: [],
      awarded_badge_levels: []
    }).encode()
  );

}