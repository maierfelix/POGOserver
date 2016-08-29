import POGOProtos from "pokemongo-protobuf";

import print from "../../../print";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function FortDetails(msg) {

  let id = msg.fort_id.split(".");

  return new Promise((resolve) => {
    this.instance.db.query("SELECT * from forts WHERE cell_id=? AND cell_uid=?", [id[0], id[1]], (e, forts) => {
      let fort = forts[0];
      if (!fort) return void 0;
      let buffer = {
        fort_id: msg.fort_id,
        name: fort.name,
        description: fort.description,
        image_urls: [
          fort.image_url
        ],
        type: "CHECKPOINT",
        latitude: fort.latitude,
        longitude: fort.longitude,
        modifiers: []
      };
      resolve(
        POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.FortDetailsResponse")
      );
    });
  });

}