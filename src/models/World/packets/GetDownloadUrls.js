import POGOProtos from "pokemongo-protobuf";

import CFG from "../../../../cfg";
import print from "../../../print";

import { GAME_ASSETS } from "../../../shared";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function GetDownloadUrls(msg) {

  let asset = null;
  let assets = GAME_ASSETS[msg.player.platform].decode.digest;
  let assetId = msg.asset_id[0];

  let ii = 0;
  let length = assets.length;

  for (; ii < length; ++ii) {
    if ((asset = assets[ii]).asset_id === assetId) {
      break;
    }
  };

  let buffer = {
    download_urls: [{
      asset_id: assetId,
      url: `http://${CFG.LOCAL_IP || this.instance.getLocalIPv4()}:${CFG.PORT}/model/${asset.bundle_name}`,
      size: asset.size,
      checksum: asset.checksum
    }]
  };

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetDownloadUrlsResponse")
  );

}