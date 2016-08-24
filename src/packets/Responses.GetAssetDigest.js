import fs from "fs";
import proto from "../proto";

import CFG from "../../cfg";

/**
 * @param {Player} player
 * @return {Object}
 */
export default function GetAssetDigest(player) {
  return (player.asset_digest.buffer);
}