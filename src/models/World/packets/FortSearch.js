import POGOProtos from "pokemongo-protobuf";

import print from "../../../print";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function FortSearch(msg) {

  let id = msg.fort_id.split(".");

  return new Promise((resolve) => {
    this.instance.db.query(`SELECT * from ${CFG.MYSQL_FORT_TABLE} WHERE cell_id=? AND cell_uid=?`, [id[0], id[1]], (e, forts) => {
      let fort = forts[0];
      if (!fort) return void 0;
      let buffer = ({
        result: "SUCCESS",
        items_awarded: [
          { item_id: 3 },
          { item_id: 4 }
        ],
        experience_awarded: 1337,
        cooldown_complete_timestamp_ms: +new Date() + fort.cooldown,
        chain_hack_sequence_number: 2
      });
      resolve(
        POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.FortSearchResponse")
      );
    });
  });

}