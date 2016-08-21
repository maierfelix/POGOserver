import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

import { GetPlayer } from "./";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function LevelUpRewards(obj) {

  let buffer = {
    "result": "AWARDED_ALREADY",
    "items_awarded": [],
    "items_unlocked": [],
    "$unknownFields": []
  }

  return POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.LevelUpRewardsResponse");

}