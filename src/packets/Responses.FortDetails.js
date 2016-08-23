import CFG from "../../cfg";

import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function FortDetails(req) {

  let buffer = ({
    "fort_id": req.fort_id,
    "name": `POGOserver v${CFG.VERSION}`,
    "image_urls": [
      "http://thecatapi.com/api/images/get?format=src&type=png"
    ],
    "type": "CHECKPOINT",
    "latitude": req.latitude,
    "longitude": req.longitude,
    "modifiers": [],
    "$unknownFields": []
  });

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.FortDetailsResponse"));

}