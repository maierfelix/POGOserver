import CFG from "../../cfg";

import fs from "fs";
import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

/**
 * @return {Object}
 */
export default function ItemTemplates() {
  return (fs.readFileSync("data/game_master"));
}