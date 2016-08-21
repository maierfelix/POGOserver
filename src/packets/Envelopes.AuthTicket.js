import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

/**
 * @return {Object}
 */
export default function AuthTicket() {

  let buffer = ({
    start: new Buffer(""),
    "expire_timestamp_ms": new Date.getTime(),
    end: new Buffer("")
  });

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Envelopes.AuthTicket"));

}