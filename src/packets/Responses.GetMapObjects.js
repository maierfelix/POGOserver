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
          latitude: 39.1893730163574220,
          longitude: -96.5853271484375000,
          owned_by_team: 2,
          guard_pokemon_id: 150,
          guard_pokemon_cp: 2000,
          gym_points: 1000,
          is_in_battle: false,
          enabled: true,
          type: proto.Map.Fort.FortType.GYM,
          sponsor: proto.Map.Fort.FortSponsor.MCDONALDS,
          rendering_type: proto.Map.Fort.FortRenderingType.DEFAULT
        })
      ],
      spawn_points: [ ],
      deleted_objects: [ ],
      is_truncated_list: false,
      fort_summaries: [ ],
      decimated_spawn_points: [ ],
      wild_pokemons: [ ],
      catchable_pokemons: [ ],
      nearby_pokemons: [ ]
    }));
  });

  return (
    new proto.Networking.Responses.GetMapObjectsResponse({
      status: 1,
      map_cells: cellsRes
    }).encode()
  );

}