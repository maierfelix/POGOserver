import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

import { GetPlayer } from "./";

/**
 * @param {Player} player
 * @return {Object}
 */
export default function SetAvatar(player) {

  let buffer = ({
    status: proto.Networking.Responses.SetAvatarResponse.Status.SUCCESS,
    player_data: GetPlayer(player)
  });

  if (player.tutorial_state.indexOf("AVATAR_SELECTION") === -1) {
    player.tutorial_state.push("AVATAR_SELECTION");
  }

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.SetAvatarResponse"));

}