import proto from "../proto";

import DownloadUrlEntry from "./Data.DownloadUrlEntry";

import {
  getDownloadUrlByAssetId
} from "../utils.js";

/**
 * @return {Object}
 */
export default function GetDownloadUrls(asset, req, download) {

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

    download(key).then((asset) => {
      console.log(node);
      download_urls.push(
        new proto.Data.DownloadUrlEntry({
          url: asset[0].asset,
          asset_id: key,
          size: parseInt(node.size),
          checksum: parseInt(node.checksum)
        })
      );
      let output = (
        new proto.Networking.Responses.GetDownloadUrlsResponse({
          download_urls: download_urls
        }).encode()
      );
      resolve(output);
    });

  });

}