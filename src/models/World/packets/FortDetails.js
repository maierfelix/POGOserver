import POGOProtos from "pokemongo-protobuf";

import CFG from "../../../../cfg";
import print from "../../../print";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function FortDetails(msg) {

  return new Promise((resolve) => {
    this.getFortDataById(msg.fort_id).then((fort) => {
      if (!fort) return void 0;
      let url = fort.image_url;
      let buffer = {
        fort_id: msg.fort_id,
        name: fort.name,
        description: fort.description,
        image_urls: [
          url
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