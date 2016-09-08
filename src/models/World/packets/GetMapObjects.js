import POGOProtos from "pokemongo-protobuf";

import CFG from "../../../../cfg";
import print from "../../../print";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function GetMapObjects(msg) {

  let latitude = msg.latitude;
  let longitude = msg.longitude;

  let mapCells = [];

  let buffer = {
    status: "SUCCESS",
    map_cells: mapCells
  };

  return new Promise((resolve) => {
    this.getFortsByCells(msg.cell_id, [], 0).then((cells) => {
      cells.map((cell) => {
        if (cell.forts.length) {
          let ids = [];
          cell.forts.map((fort) => {
            let id = fort.cellId + "." + fort.uid;
            if (ids.indexOf(id) > -1) print(`Duplicated fort!!!! => ${id}`, 31);
            else ids.push(id);
          });
        }
        mapCells.push(cell.serialize(msg.player));
      });
      resolve(
        POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetMapObjectsResponse")
      );
    });
  });

}