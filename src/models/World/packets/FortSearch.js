import POGOProtos from "pokemongo-protobuf";

import print from "../../../print";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function FortSearch(msg) {

  let id = String(msg.fort_id);
  let number = id.substring(id.lastIndexOf(".") + 1);

  return new Promise((resolve) => {
    this.instance.getQueryByColumnFromTable("id", number, "forts").then((forts) => {
      let buffer = ({
        result: "SUCCESS",
        items_awarded: [{
          "item_id": 3,
          "item_count": 1
        }],
        experience_awarded: 1337,
        cooldown_complete_timestamp_ms: +new Date() + 5e3,
        chain_hack_sequence_number: 2
      });
      resolve(
        POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.FortSearchResponse")
      );
    });
  });

}