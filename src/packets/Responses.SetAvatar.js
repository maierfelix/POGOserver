import proto from "../proto";

import { GetPlayer } from "./";

/**
 * @param {Player} player
 * @return {Object}
 */
export default function SetAvatar(player) {

  return (
    new proto.Networking.Responses.SetAvatarResponse({
      status: proto.Networking.Responses.SetAvatarResponse.Status.SUCCESS,
      player_data: GetPlayer(player).player_data
    }).encode()
  );

}