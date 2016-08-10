import proto from "../proto";

/**
 * @param {Request} request
 * @return {Object}
 */
export default function GetMapObjects(request) {

  var cells = proto.Networking.Requests.Messages.GetMapObjectsMessage.decode(request.request_message.toBuffer()).cell_id;

  var cellsRes = [];

  cells.forEach((cell) => {
    cellsRes.push(new proto.Map.MapCell({
      s2_cell_id: cell,
      current_timestamp_ms: new Date().getTime() * 1e3,
      forts: [],
      spawn_points: [],
      deleted_objects: [],
      is_truncated_list: false,
      fort_summaries: [],
      decimated_spawn_points: [],
      wild_pokemons: [],
      catchable_pokemons: [],
      nearby_pokemons: []
    }));
  });

  let cell = cellsRes[cellsRes.length - 1];

  cellsRes[cellsRes.length - 2].forts = [
    new proto.Map.Fort.FortData({
      id: "roflcopter",
      last_modified_timestamp_ms: 1470787552992,
      //latitude: 39.1914,
      //longitude: -96.5850,
      latitude: 39.19047143172622,
      longitude: -96.58502161502839,
      enabled: true,
      type: proto.Map.Fort.FortType.CHECKPOINT,
      cooldown_complete_timestamp_ms: new Date().getTime(),
      sponsor: proto.Map.Fort.FortSponsor.UNSET_SPONSOR
    })
  ];

  cell.wild_pokemons = [
    new proto.Map.Pokemon.WildPokemon({
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
    })
  ];

  cell.catchable_pokemons = [
    new proto.Map.Pokemon.MapPokemon({
      spawn_point_id: "87bdd289c69",
      encounter_id: 11810991820755313517,
      pokemon_id: 19,
      latitude: 39.19047143172622,
      longitude: -96.58502161502839,
      expiration_timestamp_ms: (new Date().getTime() + 1e6) * 1e3
    })
  ];

  cell.nearby_pokemons = [
    new proto.Map.Pokemon.NearbyPokemon({
      distance_in_meters: 200.0,
      pokemon_id: 19
    })
  ];

  return (
    new proto.Networking.Responses.GetMapObjectsResponse({
      status: 1,
      map_cells: cellsRes
    }).encode()
  );

}