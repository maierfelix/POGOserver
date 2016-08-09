import proto from "../proto";

import { GetPlayer } from "./";

/**
 * @param {Player} player
 * @return {Object}
 */
export default function MarkTutorialComplete(player) {

  return (
    new proto.Networking.Respones.MarkTutorialCompleteResponse({
      success: true,
      player_data: GetPlayer(player).player_data
    }).encode()
  );

}