import CFG from "../../cfg";

import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Player} player
 * @return {Buffer}
 */
export default function FortSearch(player) {

  let ii = 0;
  let items = [];

  let name = "ultra_ball";
  let amount = 5;
  let exp = 50;

  while (++ii < amount) {
    items.push({
      "item_id": "ITEM_" + name.toUpperCase(),
      "item_count": 1
    });
  };

  player.items[name] += amount;
  player.exp += exp;

  console.log(player.items[name]);

  let buffer = ({
    "result": "SUCCESS",
    "items_awarded": items,
    "experience_awarded": exp,
    "cooldown_complete_timestamp_ms": "1471780158665",
    "chain_hack_sequence_number": 2,
    "$unknownFields": []
  });

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.FortSearchResponse"));

}