import * as CFG from "../../cfg";

import proto from "../proto";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function FortDetails(req) {

  let data = proto.Networking.Requests.Messages.FortDetailsMessage.decode(req.request_message.toBuffer());

  return (
    new proto.Networking.Responses.FortDetailsResponse({
      "fort_id": data.fort_id,
      "team_color": 0,
      "pokemon_data": null,
      "name": "POGOserver v0.2.0",
      "description": "Weird species below",
      "image_urls": [
        "http://thecatapi.com/api/images/get?format=src&type=png"
      ],
      "fp": 0,
      "stamina": 0,
      "max_stamina": 0,
      "type": 1,
      "latitude": data.latitude,
      "longitude": data.longitude,
      "modifiers": [
        new proto.Map.Fort.FortModifier({
          item_id: proto.Inventory.Item.ItemId.ITEM_TROY_DISK,
          expiration_timestamp_ms: (new Date().getTime() + 1e3) * 1e3,
          deployer_player_codename: "The Big Lebowski"
        }) 
      ]
    }).encode()
  );

}