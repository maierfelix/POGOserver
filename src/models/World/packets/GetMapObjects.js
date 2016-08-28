import POGOProtos from "pokemongo-protobuf";

import s2 from "s2-geometry";

import print from "../../../print";

const S2Geo = s2.S2;

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

  let limit = msg.cell_id.length;

  // TODO: oop, forts are world objects!

  return new Promise((resolve) => {
    var self = this;
    function getForts(index) {
      self.instance.getQueryByColumnFromTable("cell_id", msg.cell_id[index], "forts").then((items) => {
        items = items || [];
        let forts = [];
        items.map((fort) => {
          forts.push({
            id: fort.cell_id + "." + fort.id,
            last_modified_timestamp_ms: "1471621873766",
            latitude: fort.latitude,
            longitude: fort.longitude,
            enabled: true,
            type: "CHECKPOINT"
          });
        });
        cells.push({
          s2_cell_id: msg.cell_id[index],
          current_timestamp_ms: +new Date(),
          forts: forts,
          spawn_points: [],
          deleted_objects: [],
          fort_summaries: [],
          decimated_spawn_points: [],
          wild_pokemons: [],
          catchable_pokemons: [],
          nearby_pokemons: []
        });
        if (index >= limit) {
          resolve(
            POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetMapObjectsResponse")
          );
          return void 0;
        }
        getForts(++index);
      });
    };
    getForts(0);
  });

}