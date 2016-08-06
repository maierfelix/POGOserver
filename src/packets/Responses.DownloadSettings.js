import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function DownloadSettings(obj) {

  return (
    new proto.Networking.Responses.DownloadSettingsResponse({
      hash: "b1f2bf509a025b7cd76e1c484e2a24411c50f0612"
    }).encode()
  );

}
