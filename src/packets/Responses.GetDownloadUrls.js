import proto from "../proto";

import DownloadUrlEntry from "./Data.DownloadUrlEntry";

import CFG from "../../cfg";

import {
  getDownloadUrlByAssetId
} from "../utils.js";

/**
 * @return {Object}
 */
export default function GetDownloadUrls(asset, ip, req) {

  let data = proto.Networking.Requests.Messages.GetDownloadUrlsMessage.decode(req.request_message.toBuffer());

  let key = data.asset_id[0];

  let download_urls = [];

  let node = null;

  for (node of asset.digest) {
    if (node.asset_id === key) {
      break;
    }
  };

  return new Promise((resolve) => {
    download_urls.push(
      new proto.Data.DownloadUrlEntry({
        asset_id: key,
        url: `http://${ip}:${CFG.PORT}/model/${node.bundle_name}`,
        size: node.size,
        checksum: node.checksum
      })
    );
    let output = (
      new proto.Networking.Responses.GetDownloadUrlsResponse({
        download_urls: download_urls
      }).encode()
    );
    resolve(output);
  });

}