import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

import CFG from "../../cfg";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function SfidaActionLog(obj) {

  let buffer = ({
  "result": "SUCCESS",
  "log_entries": [
    {
      "timestamp_ms": "1471694560585",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "HORSEA",
        "combat_points": 110
      }
    },
    {
      "timestamp_ms": "1471694566830",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "HORSEA",
        "combat_points": 73
      }
    },
    {
      "timestamp_ms": "1471694573468",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 2
          },
          {
            "item_id": "ITEM_POTION",
            "count": 1
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471694597662",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "HORSEA",
        "combat_points": 102
      }
    },
    {
      "timestamp_ms": "1471694603880",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "CATERPIE",
        "combat_points": 36
      }
    },
    {
      "timestamp_ms": "1471694610259",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "WEEDLE",
        "combat_points": 15
      }
    },
    {
      "timestamp_ms": "1471694616586",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "PIDGEY",
        "combat_points": 26
      }
    },
    {
      "timestamp_ms": "1471694632969",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_RAZZ_BERRY",
            "count": 1
          },
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 1
          },
          {
            "item_id": "ITEM_POTION",
            "count": 1
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471694739319",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 2
          },
          {
            "item_id": "ITEM_POTION",
            "count": 2
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471694741772",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 4
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471694904167",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "KRABBY",
        "combat_points": 100
      }
    },
    {
      "timestamp_ms": "1471694925722",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_RAZZ_BERRY",
            "count": 2
          },
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 4
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695030964",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_RAZZ_BERRY",
            "count": 1
          },
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 3
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695071016",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 2
          },
          {
            "item_id": "ITEM_POTION",
            "count": 1
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695089887",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "SPEAROW",
        "combat_points": 80
      }
    },
    {
      "timestamp_ms": "1471695096341",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 3
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695139926",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "EKANS",
        "combat_points": 72
      }
    },
    {
      "timestamp_ms": "1471695148440",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 2
          },
          {
            "item_id": "ITEM_POTION",
            "count": 1
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695195481",
      "catch_pokemon": {
        "result": "UNKNOWN_ENUM_VALUE_Result_3",
        "pokemon_id": "MAGIKARP",
        "combat_points": 26
      }
    },
    {
      "timestamp_ms": "1471695197676",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "ZUBAT",
        "combat_points": 41
      }
    },
    {
      "timestamp_ms": "1471695203917",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "MAGIKARP",
        "combat_points": 46
      }
    },
    {
      "timestamp_ms": "1471695211919",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_RAZZ_BERRY",
            "count": 1
          },
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 2
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695316895",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "ZUBAT",
        "combat_points": 43
      }
    },
    {
      "timestamp_ms": "1471695323589",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 3
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695429795",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_RAZZ_BERRY",
            "count": 1
          },
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 1
          },
          {
            "item_id": "ITEM_POTION",
            "count": 1
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695487237",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_RAZZ_BERRY",
            "count": 1
          },
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 2
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695522740",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_RAZZ_BERRY",
            "count": 1
          },
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 2
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695577816",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 1
          },
          {
            "item_id": "ITEM_POTION",
            "count": 2
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695633092",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 1
          },
          {
            "item_id": "ITEM_POTION",
            "count": 2
          }
        ],
        "eggs": 1
      }
    },
    {
      "timestamp_ms": "1471695738726",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_RAZZ_BERRY",
            "count": 1
          },
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 2
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695776746",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_RAZZ_BERRY",
            "count": 1
          },
          {
            "item_id": "ITEM_REVIVE",
            "count": 1
          },
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 1
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695790415",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_REVIVE",
            "count": 1
          },
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 4
          },
          {
            "item_id": "ITEM_POTION",
            "count": 1
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695829422",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "MAGIKARP",
        "combat_points": 40
      }
    },
    {
      "timestamp_ms": "1471695836445",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 2
          },
          {
            "item_id": "ITEM_POTION",
            "count": 1
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695838748",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 2
          },
          {
            "item_id": "ITEM_POTION",
            "count": 1
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695860629",
      "catch_pokemon": {
        "result": "POKEMON_FLED",
        "pokemon_id": "VENONAT",
        "combat_points": 174
      }
    },
    {
      "timestamp_ms": "1471695866223",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 2
          },
          {
            "item_id": "ITEM_POTION",
            "count": 1
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695884419",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "STARYU",
        "combat_points": 11
      }
    },
    {
      "timestamp_ms": "1471695889856",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 3
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471695906137",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "PINSIR",
        "combat_points": 28
      }
    },
    {
      "timestamp_ms": "1471695914356",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 3
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471696008778",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 3
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471696010713",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "CATERPIE",
        "combat_points": 74
      }
    },
    {
      "timestamp_ms": "1471696050313",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 3
          },
          {
            "item_id": "ITEM_POTION",
            "count": 1
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471696052566",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 3
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471696072147",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 1
          },
          {
            "item_id": "ITEM_POTION",
            "count": 2
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471696074058",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "ZUBAT",
        "combat_points": 40
      }
    },
    {
      "timestamp_ms": "1471696079308",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_RAZZ_BERRY",
            "count": 1
          },
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 2
          },
          {
            "item_id": "ITEM_POTION",
            "count": 1
          }
        ]
      }
    },
    {
      "timestamp_ms": "1471696081215",
      "catch_pokemon": {
        "result": "POKEMON_CAPTURED",
        "pokemon_id": "ZUBAT",
        "combat_points": 73
      }
    },
    {
      "timestamp_ms": "1471696235352",
      "fort_search": {
        "result": "SUCCESS",
        "items": [
          {
            "item_id": "ITEM_POKE_BALL",
            "count": 3
          }
        ]
      }
    }
  ],
  "$unknownFields": []
});

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.SfidaActionLogResponse"));

}