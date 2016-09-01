import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function SetAvatar(msg) {

  for (let key in msg.player_avatar) {
    this.avatar[key] = msg.player_avatar[key];
  };

  let buffer = ({
    status: "SUCCESS",
    player_data: this.getPlayerData()
  });

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.SetAvatarResponse")
  );

}