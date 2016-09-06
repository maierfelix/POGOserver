import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function SetAvatar(msg) {

  if (!msg.player_avatar.hasOwnProperty("gender")) {
    msg.player_avatar.gender = "MALE";
  }

  let gender = msg.player_avatar.gender;
  let genderChange = this.avatar.gender !== gender;

  msg.player_avatar.gender = gender === "MALE" ? 0 : 1;

  if (genderChange) {
    this.avatar.resetOutfit();
  }

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