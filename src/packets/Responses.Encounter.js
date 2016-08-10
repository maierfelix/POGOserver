import * as CFG from "../../cfg";

import proto from "../proto";

import { decodeLong } from "../utils";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function Encounter(req) {

  let data = proto.Networking.Requests.Messages.EncounterMessage.decode(req.request_message.toBuffer());

  let encounter_id = decodeLong(
    data.encounter_id.high, data.encounter_id.low, data.encounter_id.unsigned
  );

  return (
    new proto.Networking.Responses.EncounterResponse({
      wild_pokemon: new proto.Map.Pokemon.WildPokemon({
        encounter_id: 11810991820755313517,
        last_modified_timestamp_ms: 1470787552996,
        latitude: 39.19047143172622,
        longitude: -96.58502161502839,
        spawn_point_id: "87bdd289c69",
        pokemon_data: new proto.Data.PokemonData({
          pokemon_id: 19,
          cp: 277,
          stamina: 41,
          stamina_max: 41,
          move_1: 221,
          move_2: 26,
          height_m: 0.22802678267819977,
          weight_kg: 1.3452539511871338,
          individual_attack: 9,
          individual_defense: 13,
          individual_stamina: 14,
          cp_multiplier: 0.5663545199394226
        }),
        time_till_hidden_ms: 730176
      }),
      background: proto.Networking.Responses.EncounterResponse.Background.PARK,
      status: proto.Networking.Responses.EncounterResponse.Status.ENCOUNTER_SUCCESS,
      capture_probability: new proto.Data.Capture.CaptureProbability({
        pokeball_type: [1, 2, 3],
        capture_probability: [
          0.352886438369751,
          0.47944003343582153,
          0.5812440514564514
        ],
        reticle_difficulty_scale: 2
      })
    }).encode()
  );

}