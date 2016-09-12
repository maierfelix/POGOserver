import POGOProtos from "pokemongo-protobuf";

import CFG from "../../../../cfg";
import print from "../../../print";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function FortSearch(msg) {

  let player = msg.player;

  return new Promise((resolve) => {
    this.getFortDataById(msg.fort_id).then((fort) => {
      if (!fort) return void 0;
      player.consumeFortRewards(fort);
      // TODO: disable rewarding when on cooldown
      let buffer = ({
        result: "SUCCESS",
        items_awarded: fort.serializeRewards(),
        experience_awarded: fort.experience,
        cooldown_complete_timestamp_ms: +new Date() + fort.cooldown,
        chain_hack_sequence_number: 2
      });
      player.info.upgradeExp(fort.experience);
      resolve(
        POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.FortSearchResponse")
      );
    });
  });

}