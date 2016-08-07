import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function ResponseEnvelope(obj) {

  return (
    new proto.Networking.Envelopes.ResponseEnvelope({
      status_code: obj.status,
      unknown6: new proto.Networking.Envelopes.Unknown6Response({
        response_type: 6,
        response_data: new proto.Networking.Envelopes.Unknown6Response.Unknown2({
          unknown1: 1
        })
      }),
      request_id: obj.id,
      returns: obj.response
    }).encode().toBuffer()
  );

}