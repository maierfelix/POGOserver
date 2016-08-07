import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function ResponseEnvelope(obj) {

  return (
    new proto.Networking.Envelopes.ResponseEnvelope({
      status_code: 53,
      request_id: obj.id,
      api_url: "pgorelease.nianticlabs.com/custom",
      auth_ticket: new proto.Networking.Envelopes.AuthTicket({
        start: new Buffer(""),
        expire_timestamp_ms: 9999999999999,
        end: new Buffer("")
      })
    }).encode().toBuffer()
  );

}