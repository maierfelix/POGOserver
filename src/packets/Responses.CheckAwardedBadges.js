import CFG from "../../cfg";

import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function CheckAwardedBadges(obj) {

  let buffer = {
    "success": true,
    "awarded_badges": [],
    "awarded_badge_levels": [],
    "$unknownFields": []
  }

  return POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.CheckAwardedBadgesResponse");

}