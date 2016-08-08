import proto from "../proto";

import DownloadUrlEntry from "./Data.DownloadUrlEntry";

/**
 * @return {Object}
 */
export default function GetDownloadUrls() {

  let download_urls = [
    DownloadUrlEntry({
      url: "",
      asset_id: "",
      size: 0,
      checksum: 0
    })
  ];

  return (
    new proto.Networking.Responses.GetDownloadUrlsResponse({
      download_urls: download_urls
    }).encode()
  );

}