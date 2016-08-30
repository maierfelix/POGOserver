import POGOProtos from "pokemongo-protobuf";

import Settings from "../../../modes";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function DownloadSettings(msg) {

  let buffer = {
    hash: "2788184af4004004d6ab0740f7632983332106f6",
    settings: Settings.GAME_SETTINGS
  };

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.DownloadSettingsResponse")
  );

}