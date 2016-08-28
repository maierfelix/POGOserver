import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function GetMapObjects(msg) {

  let latitude = msg.latitude;
  let longitude = msg.longitude;

  let cells = [];

  let buffer = {
    status: "SUCCESS",
    map_cells: cells
  };

  for (let cell in msg.cell_id) {
    cells.push({
      s2_cell_id: cell,
      current_timestamp_ms: +new Date(),
      forts: [],
      spawn_points: [],
      deleted_objects: [],
      fort_summaries: [],
      decimated_spawn_points: [],
      wild_pokemons: [],
      catchable_pokemons: [],
      nearby_pokemons: []
    });
  };

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetMapObjectsResponse")
  );

}