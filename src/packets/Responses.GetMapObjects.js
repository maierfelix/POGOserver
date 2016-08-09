import proto from "../proto";

/**
 * @param {Request} request
 * @return {Object}
 */
export default function GetMapObjects(request) {

  var cells = proto.Networking.Requests.Messages.GetMapObjectsMessage.decode(request.request_message.toBuffer()).cell_id;

  var cellsRes = [];

  cells.forEach((cell)=>{
    cellsRes.push(new proto.Map.MapCell({
      s2_cell_id: cell,
      current_timestamp_ms: new Date().getTime() * 1000,
      forts: [
        new proto.Map.Fort.FortData({
          id: "wuff",
          last_modified_timestamp_ms: new Date().getTime() * 1000,
          latitude: 39.19047143172651,
          longitude: -96.58502161502833,
          owned_by_team: 2,
          guard_pokemon_id: 150,
          guard_pokemon_cp: 2000,
          gym_points: 1000,
          is_in_battle: false,
          enabled: true,
          type: proto.Map.Fort.FortType.CHECKPOINT,
          sponsor: proto.Map.Fort.FortSponsor.MCDONALDS,
          rendering_type: proto.Map.Fort.FortRenderingType.DEFAULT
        })
      ],
      spawn_points: [],
      deleted_objects: [ ],
      is_truncated_list: false,
      fort_summaries: [ ],
      decimated_spawn_points: [ ],
      wild_pokemons: [
        new proto.Map.Pokemon.WildPokemon({
          encounter_id: 6180230722423979422,
          last_modified_timestamp_ms: new Date().getTime() * 1e3,
          latitude: 39.19047143172621,
          longitude: -96.58502161502838,
          spawn_point_id: "",
          pokemon_data: new proto.Data.PokemonData({
            "move_1": 211,
            "move_2": 45,
            "pokemon_id": 21,
            "height_m": 0.2640344202518463,
            "stamina_max": 14,
            "weight_kg": 1.2240252494812012,
            "individual_defense": 8,
            "stamina": 14,
            "individual_stamina": 10,
            "individual_attack": 12,
            "cp": 27
          }),
          time_till_hidden_ms: 597695
        })
      ],
      catchable_pokemons: [
        new proto.Map.Pokemon.MapPokemon({
          spawn_point_id: "",
          encounter_id: 6180230722423979422,
          pokemon_id: proto.Enums.PokemonId.SPEAROW,
          expiration_timestamp_ms: (new Date().getTime() + 1e6) * 1e3,
          latitude: 39.19047143172621,
          longitude: -96.58502161502838
        })
      ],
      nearby_pokemons: [
        new proto.Map.Pokemon.NearbyPokemon({
          pokemon_id: proto.Enums.PokemonId.SPEAROW,
          distance_in_meters: 1.0,
          encounter_id: 6180230722423979422
        })
      ]
    }));
  });

  return (
    new proto.Networking.Responses.GetMapObjectsResponse({
      status: 1,
      map_cells: cellsRes
    }).encode()
  );

}