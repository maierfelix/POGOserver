import fs from "fs";
import proto from "../proto";

import * as CFG from "../../cfg";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function GetAssetDigest(asset, req) {

  let data = proto.Networking.Requests.Messages.GetAssetDigestMessage.decode(req.request_message.toBuffer());

  let digests = [];

  asset.digest.map((item) => {
    digests.push(
      new proto.Data.AssetDigestEntry({
        asset_id: item.getAssetId(),
        bundle_name: item.getBundleName(),
        version: item.getVersion(),
        checksum: item.getChecksum(),
        size: item.getSize(),
        key: item.getKey()
      })
    );
  });

  return (
    new proto.Networking.Responses.GetAssetDigestResponse({
      timestamp_ms: new Date().getTime() * 1e3,
      digest: digests
    }).encode()
  );

}