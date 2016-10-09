import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function ClaimCodename(msg) {

  let buffer = null;
  let schema = "POGOProtos.Networking.Responses.ClaimCodenameResponse";

  let codename = msg.codename;
  if(codename) this.setUsername(codename);

  buffer = {
    codename: codename,
    "user_message": "Testing message",
    "is_assignable": true,
    status: null,
    updated_player: null
  };

  buffer.status = codename ? "SUCCESS" : "CODENAME_NOT_AVAILABLE";
  buffer.updated_player = this.getPlayerData();


  return (POGOProtos.serialize(buffer, schema));

}