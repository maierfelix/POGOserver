import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function GetHatchedEggs(obj) {

  let buffer = {
    "success": true,
    "pokemon_id": [],
    "experience_awarded": [],
    "candy_awarded": [],
    "stardust_awarded": [],
    "$unknownFields": []
  };

  return POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetHatchedEggsResponse");

}