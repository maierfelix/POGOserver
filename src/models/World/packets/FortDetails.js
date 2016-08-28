import POGOProtos from "pokemongo-protobuf";

import print from "../../../print";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function FortDetails(msg) {

  let id = String(msg.fort_id);
  let number = id.substring(id.lastIndexOf(".") + 1);

  return new Promise((resolve) => {
    this.instance.getQueryByColumnFromTable("id", number, "forts").then((forts) => {
      let fort = forts[0];
      let buffer = {
        fort_id: id,
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