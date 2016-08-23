import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Player} player
 * @param {Request} request
 * @return {Object}
 */
export default function GetMapObjects(player, wild_pkmns, request) {

  let cells = request.cell_id;
  let cellsRes = [];

  let pokemon_id = 121;

  cells.forEach((cell) => {
    cellsRes.push({
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
    });
  });

  let latitude = player.latitude;
  let longitude = player.longitude;

  let cell = cellsRes[0];

  cell.forts = [
    {
      "id": "108dc9c703a94b619a53a3c29b5c676f.11",
      "last_modified_timestamp_ms": "1471621873766",
      "latitude": 39.188577,
      "longitude": -96.583527,
      "enabled": true,
      "type": "CHECKPOINT"
    },
    {
      "id": "1391315b489f421abd52ce10b6da7dd3.16",
      "last_modified_timestamp_ms": "1471776325164",
      "latitude": 39.188351,
      "longitude": -96.582561,
      "enabled": true,
      "type": "CHECKPOINT"
    },
    {
      "id": "33ad17c71fff4797b7f25dcfcdca48df.16",
      "last_modified_timestamp_ms": "1470755536809",
      "latitude": 39.189386,
      "longitude": -96.581113,
      "enabled": true,
      "type": "CHECKPOINT"
    },
    {
      "id": "40f86138ca6f49cc9e98e18b77d6067a.16",
      "last_modified_timestamp_ms": "1471748353301",
      "latitude": 39.188351,
      "longitude": -96.582209,
      "enabled": true,
      "type": "CHECKPOINT"
    },
    {
      "id": "560ef7ed6cb5469db29b543cce7677ae.16",
      "last_modified_timestamp_ms": "1469923654520",
      "latitude": 39.186848,
      "longitude": -96.581267,
      "enabled": true,
      "type": "CHECKPOINT"
    },
    {
      "id": "60d2ffcfe9cf4003b4d94bcc9ee0c318.16",
      "last_modified_timestamp_ms": "1471811998365",
      "latitude": 39.188008,
      "longitude": -96.582409,
      "enabled": true,
      "type": "CHECKPOINT"
    },
    {
      "id": "637941f1f2494276884ede4fc538c2b2.16",
      "last_modified_timestamp_ms": "1471816829142",
      "latitude": 39.186868,
      "longitude": -96.583295,
      "enabled": true,
      "type": "CHECKPOINT"
    },
    {
      "id": "7c0154d02e4f4d91b9b74214eda75abc.16",
      "last_modified_timestamp_ms": "1471483788730",
      "latitude": 39.187991,
      "longitude": -96.581251,
      "enabled": true,
      "type": "CHECKPOINT"
    },
    {
      "id": "8a94bf6cd17b43be8b5b42655d23e2f6.16",
      "last_modified_timestamp_ms": "1471751252546",
      "latitude": 39.187684,
      "longitude": -96.583537,
      "enabled": true,
      "type": "CHECKPOINT"
    },
    {
      "id": "9b469dbd550f43b5a8e94f941d66bc43.16",
      "last_modified_timestamp_ms": "1471243641146",
      "latitude": 39.189051,
      "longitude": -96.581804,
      "enabled": true,
      "type": "CHECKPOINT"
    },
    {
      "id": "bb0e515e3f554b398f1fa9c58435dc78.16",
      "last_modified_timestamp_ms": "1471748285036",
      "latitude": 39.188823,
      "longitude": -96.582742,
      "enabled": true,
      "type": "CHECKPOINT"
    }
  ];

  cell.spawn_points = [
    {
      "latitude": 39.188870250798956,
      "longitude": -96.58196728549451
    },
    {
      "latitude": 39.1889464335866,
      "longitude": -96.58205070456887
    },
    {
      "latitude": 39.18887496474473,
      "longitude": -96.58188386652927
    },
    {
      "latitude": 39.18879406783625,
      "longitude": -96.58188386652927
    },
    {
      "latitude": 39.189284161630674,
      "longitude": -96.58180044767312
    }
  ];

  for (let pkmn of wild_pkmns) {
    cell.wild_pokemons.push({
      encounter_id: pkmn.encounter_id,
      last_modified_timestamp_ms: new Date().getTime(),
      latitude: pkmn.latitude,
      longitude: pkmn.longitude,
      spawn_point_id: "87bdd289c69",
      pokemon_data: {
        pokemon_id: pkmn.pokemon_id,
        cp: pkmn.cp,
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
      },
      time_till_hidden_ms: 730176
    });
    cell.catchable_pokemons.push({
      spawn_point_id: "87bdd289c69",
      encounter_id: pkmn.encounter_id,
      pokemon_id: pkmn.pokemon_id,
      latitude: latitude,
      longitude: longitude,
      expiration_timestamp_ms: (new Date().getTime() + 1e6) * 1e3
    });
    cell.nearby_pokemons.push({
      distance_in_meters: 200.0,
      pokemon_id: pkmn.pokemon_id
    });
  };

  let buffer = ({
    status: "SUCCESS",
    map_cells: cellsRes
  });

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetMapObjectsResponse"));

}