import * as CFG from "../cfg";

import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function GetAssetDigest(obj) {

  return (
    fs.readFileSync(CFG.ASSET_DIGEST_PATH)
  );

}