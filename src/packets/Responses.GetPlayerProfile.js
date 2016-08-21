import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function GetPlayerProfile(obj) {

  let buffer = ({
    "result": "SUCCESS",
    "start_time": "1471096437979",
    "badges": [
      {
        "badge_type": "BADGE_TRAVEL_KM",
        "end_value": 10,
        "current_value": 3.921541213989258
      },
      {
        "badge_type": "BADGE_POKEDEX_ENTRIES",
        "rank": 1,
        "start_value": 5,
        "end_value": 50,
        "current_value": 25
      },
      {
        "badge_type": "BADGE_CAPTURE_TOTAL",
        "rank": 1,
        "start_value": 30,
        "end_value": 500,
        "current_value": 71
      },
      {
        "badge_type": "BADGE_EVOLVED_TOTAL",
        "end_value": 3
      },
      {
        "badge_type": "BADGE_HATCHED_TOTAL",
        "end_value": 10,
        "current_value": 1
      },
      {
        "badge_type": "BADGE_POKESTOPS_VISITED",
        "rank": 1,
        "start_value": 100,
        "end_value": 1000,
        "current_value": 123
      },
      {
        "badge_type": "BADGE_BIG_MAGIKARP",
        "end_value": 3,
        "current_value": 1
      },
      {
        "badge_type": "BADGE_BATTLE_ATTACK_WON",
        "end_value": 10
      },
      {
        "badge_type": "BADGE_BATTLE_TRAINING_WON",
        "end_value": 10
      },
      {
        "badge_type": "BADGE_TYPE_NORMAL",
        "rank": 1,
        "start_value": 10,
        "end_value": 50,
        "current_value": 24
      },
      {
        "badge_type": "BADGE_TYPE_FIGHTING",
        "end_value": 10
      },
      {
        "badge_type": "BADGE_TYPE_FLYING",
        "rank": 1,
        "start_value": 10,
        "end_value": 50,
        "current_value": 26
      },
      {
        "badge_type": "BADGE_TYPE_POISON",
        "rank": 1,
        "start_value": 10,
        "end_value": 50,
        "current_value": 20
      },
      {
        "badge_type": "BADGE_TYPE_GROUND",
        "end_value": 10,
        "current_value": 1
      },
      {
        "badge_type": "BADGE_TYPE_ROCK",
        "end_value": 10
      },
      {
        "badge_type": "BADGE_TYPE_BUG",
        "rank": 1,
        "start_value": 10,
        "end_value": 50,
        "current_value": 14
      },
      {
        "badge_type": "BADGE_TYPE_GHOST",
        "end_value": 10
      },
      {
        "badge_type": "BADGE_TYPE_STEEL",
        "end_value": 10
      },
      {
        "badge_type": "BADGE_TYPE_FIRE",
        "end_value": 10,
        "current_value": 1
      },
      {
        "badge_type": "BADGE_TYPE_WATER",
        "rank": 1,
        "start_value": 10,
        "end_value": 50,
        "current_value": 14
      },
      {
        "badge_type": "BADGE_TYPE_GRASS",
        "end_value": 10,
        "current_value": 3
      },
      {
        "badge_type": "BADGE_TYPE_ELECTRIC",
        "end_value": 10
      },
      {
        "badge_type": "BADGE_TYPE_PSYCHIC",
        "end_value": 10,
        "current_value": 1
      },
      {
        "badge_type": "BADGE_TYPE_ICE",
        "end_value": 10
      },
      {
        "badge_type": "BADGE_TYPE_DRAGON",
        "end_value": 10
      },
      {
        "badge_type": "BADGE_TYPE_DARK",
        "end_value": 10
      },
      {
        "badge_type": "BADGE_TYPE_FAIRY",
        "end_value": 10,
        "current_value": 3
      },
      {
        "badge_type": "BADGE_SMALL_RATTATA",
        "end_value": 3
      },
      {
        "badge_type": "BADGE_PIKACHU",
        "end_value": 3
      }
    ],
    "$unknownFields": []
  });

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetPlayerProfileResponse"));

}
