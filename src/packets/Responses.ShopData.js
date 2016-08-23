import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

import CFG from "../../cfg";

/**
 * @return {Object}
 */
export default function ShopData() {

  let buffer = ({
    "response_type": 5,
    "unknown2": {
      "unknown1": "1",
      "items": [
        {
          "item_id": "pgorelease.pokeball.100",
          "currency_to_buy": {
            "name": "POKECOIN",
            "amount": 460
          },
          "yields_item": {
            "count": 100
          },
          "tags": [
            {
              "key": "CATEGORY",
              "value": "ITEMS"
            },
            {
              "key": "SORT",
              "value": "2"
            }
          ]
        },
        {
          "item_id": "pgorelease.pokecoin.100",
          "is_iap": true,
          "yields_currency": {
            "name": "POKECOIN",
            "amount": 100
          },
          "tags": [
            {
              "key": "CATEGORY",
              "value": "POKECOINS"
            },
            {
              "key": "SORT",
              "value": "1"
            }
          ],
          "unknown7": 1
        }
      ],
      "player_currencies": [
        {
          "name": "POKECOIN"
        },
        {
          "name": "STARDUST",
          "amount": 7681
        }
      ],
      "unknown4": "ZCgldzCNR+0pbImyvzykby/6+iA="
    }
  });

  return (buffer);

}