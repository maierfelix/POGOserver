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
    player_data: GetPlayer(player).player_data
  });

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.SetAvatarResponse"));

}