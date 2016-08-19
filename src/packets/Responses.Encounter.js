import CFG from "../../cfg";

import proto from "../proto";

import { decodeLong } from "../utils";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function Encounter(req) {

  let id = decodeLong({
    "low": 0,
    "high": 0,
    "unsigned": true
  });

  return (
    new proto.Networking.Responses.EncounterResponse({
        wild_pokemon: new proto.Map.Pokemon.WildPokemon({
        encounter_id: decodeLong({
          "low": -1477718883,
          "high": -1178282273,
          "unsigned": true
        }),
        last_modified_timestamp_ms: decodeLong({
          "low": 2047340539,
          "high": 342,
          "unsigned": false
        }),
        latitude: 39.19071817474392,
        longitude: -96.58505386390713,
        spawn_point_id: "87bdcd8e959",
        pokemon_data: new proto.Data.PokemonData({
          id: id,
          pokemon_id: 17,
          cp: 48,
          stamina: 22,
          stamina_max: 22,
          move_1: 210,
          move_2: 45,
          deployed_fort_id: "",
          owner_name: "",
          is_egg: false,
          egg_km_walked_target: 0,
          egg_km_walked_start: 0,
          origin: 0,
          height_m: 0.8371214866638184,
          weight_kg: 19.039264678955078,
          individual_attack: 6,
          individual_defense: 12,
          individual_stamina: 7,
          cp_multiplier: 0.16639786958694458,
          pokeball: 0,
          captured_cell_id: id,
          battles_attacked: 0,
          battles_defended: 0,
          egg_incubator_id: "",
          creation_time_ms: id,
          num_upgrades: 0,
          additional_cp_multiplier: 0,
          favorite: 0,
          nickname: "",
          from_fort: 0
        }),
        time_till_hidden_ms: 336009
      }),
      background: 0,
      status: 1,
      capture_probability: new proto.Data.Capture.CaptureProbability({
        pokeball_type: [1, 2, 3],
        capture_probability: [0.6009692549705505, 0.7479367256164551, 0.8407744765281677],
        reticle_difficulty_scale: 0
      })
    }).encode()
  );

}