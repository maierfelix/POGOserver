import CFG from "../../cfg";

import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function FortSearch(obj) {

  let ii = 0;
  let amount = 5;
  let items = [];

  while (++ii < amount) {
    items.push({
      "item_id": "ITEM_MASTER_BALL",
      "item_count": 1
    })
  };

  let buffer = ({
    "result": "SUCCESS",
    "items_awarded": items,
    "experience_awarded": 50,
    "cooldown_complete_timestamp_ms": "1471780158665",
    "chain_hack_sequence_number": 2,
    "$unknownFields": []
  });

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.FortSearchResponse"));

}