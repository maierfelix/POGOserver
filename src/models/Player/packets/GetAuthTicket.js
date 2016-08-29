import POGOProtos from "pokemongo-protobuf";

export default function GetAuthTicket(id) {

  let buffer = ({
    status_code: 53,
    request_id: id,
    api_url: "pgorelease.nianticlabs.com/custom",
    auth_ticket: {
      start: new Buffer(""),
      expire_timestamp_ms: 9999999999999,
      end: new Buffer("")
    }
  });

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Envelopes.ResponseEnvelope")
  );

}