import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

import CFG from "../../cfg";

import {
  getDownloadUrlByAssetId
} from "../utils.js";

/**
 * @return {Object}
 */
export default function GetDownloadUrls(asset, ip, req) {

  let key = req.asset_id[0];

  let download_urls = [];

  let node = null;

  for (node of asset.digest) {
    if (node.asset_id === key) {
      break;
    }
  };

  return new Promise((resolve) => {
    download_urls.push(
      {
        asset_id: key,
        url: `http://${ip}:${CFG.PORT}/model/${node.bundle_name}`,
        size: node.size,
        checksum: node.checksum
      }
    );
    let buffer = ({
      download_urls: download_urls
    });
    resolve(POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetDownloadUrlsResponse"));
  });

}