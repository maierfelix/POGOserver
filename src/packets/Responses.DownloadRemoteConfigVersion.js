import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function DownloadRemoteConfigVersion(obj) {

  return (
    new proto.Networking.Responses.DownloadSettingsResponse({
      hash: "54b359c97e46900f87211ef6e6dd0b7f2a3ea1f5"
    }).encode()
  );

}