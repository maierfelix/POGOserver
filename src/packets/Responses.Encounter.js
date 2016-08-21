import CFG from "../../cfg";

import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

import { decodeLong } from "../utils";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function Encounter(req) {
console.log(req.encounter_id, req.player_latitude, req.player_longitude);
  let buffer = ({
    "wild_pokemon": {
      "encounter_id": req.encounter_id,
      "last_modified_timestamp_ms": new Date().getTime(),
      "latitude": req.player_latitude,
      "longitude": req.player_longitude,
      "spawn_point_id": "87bdcd8ec57",
      "pokemon_data": {
        "pokemon_id": "MEWTWO",
        "cp": 164,
        "stamina": 38,
        "stamina_max": 38,
        "move_1": "TACKLE_FAST",
        "move_2": "BODY_SLAM",
        "height_m": 0.36679142713546753,
        "weight_kg": 9.639217376708984,
        "individual_attack": 15,
        "individual_defense": 1,
        "individual_stamina": 9,
        "cp_multiplier": 0.3210875988006592
      },
      "time_till_hidden_ms": 857876
    },
    "status": "ENCOUNTER_SUCCESS",
    "capture_probability": {
      "pokeball_type": [
        "ITEM_POKE_BALL",
        "ITEM_GREAT_BALL",
        "ITEM_ULTRA_BALL"
      ],
      "capture_probability": {
        "0": 0.49830639362335205,
        "1": 0.6446487903594971,
        "2": 0.7483035326004028
      }
    }
  });

  return POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.EncounterResponse");

}