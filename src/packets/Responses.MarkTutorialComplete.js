import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

import { GetPlayer } from "./";

/**
 * @param {Player} player
 * @param {Object} req
 * @return {Object}
 */
export default function MarkTutorialComplete(player, req) {

  if (req.tutorials_completed[0] === "LEGAL_SCREEN") {
    player.tutorial_state.push("LEGAL_SCREEN");
    player.send_marketing_emails = !!req.send_marketing_emails;
  }

  let buffer = ({
    success: true,
    player_data: GetPlayer(player).player_data
  });

  return POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetHatchedEggsResponse");

}