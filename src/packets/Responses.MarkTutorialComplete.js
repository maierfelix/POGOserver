import proto from "../proto";

import { GetPlayer } from "./";

/**
 * @param {Player} player
 * @return {Object}
 */
export default function MarkTutorialComplete(player) {

  return (
    new proto.Networking.Responses.MarkTutorialCompleteResponse({
      success: true,
      player_data: GetPlayer(player).player_data
    }).encode()
  );

}