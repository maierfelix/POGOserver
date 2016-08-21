import fs from "fs";
import proto from "../proto";

import CFG from "../../cfg";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function GetAssetDigest(req) {
  return (fs.readFileSync("data/asset_digest"));
}