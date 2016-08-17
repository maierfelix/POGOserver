import proto from "../proto";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function DownloadRemoteConfigVersion(req) {

  let data = proto.Networking.Requests.Messages.DownloadRemoteConfigVersionMessage.decode(req.request_message.toBuffer());

  return (
    new proto.Networking.Responses.DownloadRemoteConfigVersionResponse({
      result: 1,
      item_templates_timestamp_ms: 1468540960537,
      asset_digest_timestamp_ms: 1468540960527
    }).encode()
  );

}