import fs from "fs";
import proto from "../proto";

import * as CFG from "../../cfg";

let asset = fs.readFileSync(CFG.ASSET_DIGEST_PATH);

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function GetAssetDigest(obj) {

  return (asset);

}