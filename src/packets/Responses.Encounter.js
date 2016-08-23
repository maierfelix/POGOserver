import CFG from "../../cfg";

import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

import { decodeLong } from "../utils";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function Encounter(encounter, req) {

  let buffer = ({
    wild_pokemon: {
      encounter_id: encounter.encounter_id,
      last_modified_timestamp_ms: '1471852141657',
      latitude: encounter.latitude,
      longitude: encounter.longitude,
      spawn_point_id: '87bdcd8f2e9',
      pokemon_data: {
        pokemon_id: encounter.pokemon_id,
        cp: encounter.cp,
        stamina: 10,
        stamina_max: 10,
        move_1: "BUG_BITE_FAST",
        move_2: "STRUGGLE",
        height_m: 0.30962005257606506,
        weight_kg: 3.3212273120880127,
        individual_attack: 7,
        individual_defense: 13,
        individual_stamina: 3,
        cp_multiplier: 0.16639786958694458
      },
      time_till_hidden_ms: 860075
    },
    status: 'ENCOUNTER_SUCCESS',
    capture_probability: {
      pokeball_type: ['ITEM_POKE_BALL', 'ITEM_GREAT_BALL', 'ITEM_ULTRA_BALL'],
      capture_probability: [1, 1, 1]
    }
  });

  return POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.EncounterResponse");

}