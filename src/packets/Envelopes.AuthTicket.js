import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

import CFG from "../../cfg";

/**
 * @return {Object}
 */
export default function AuthTicket() {

  let buffer = ({
    start: new Buffer(""),
    "expire_timestamp_ms": new Date().getTime() + CFG.PLAYER_CONNECTION_TIMEOUT,
    end: new Buffer("")
  });

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Envelopes.AuthTicket"));

}