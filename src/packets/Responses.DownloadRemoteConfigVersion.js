import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function DownloadRemoteConfigVersion(obj) {

  return (
    new proto.Networking.Responses.DownloadRemoteConfigVersionResponse({
      result: 1,
      item_templates_timestamp_ms: new Date().getTime() * 1e3,
      asset_digest_timestamp_ms: new Date().getTime() * 1e3
    }).encode()
  );

}