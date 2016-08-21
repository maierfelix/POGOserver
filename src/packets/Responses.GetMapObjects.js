import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

import {
  decodeLong
} from "../utils";
 
/**
 * @param {Player} player
 * @param {Request} request
 * @return {Object}
 */
export default function GetMapObjects(player, request) {

  let buffer = ({
  "map_cells": [
    {
      "s2_cell_id": "9781205377482752000",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "080edcf9e1ef429f8b29cc30f7723bc4.16",
          "last_modified_timestamp_ms": "1471051322524",
          "latitude": 39.188289,
          "longitude": -96.57824,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "5a19a585c135457ebd5db1e2601211b9.16",
          "last_modified_timestamp_ms": "1470031346220",
          "latitude": 39.189395,
          "longitude": -96.577655,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781205371040301056",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "023e03844d3c470785bb7ead037cae56.16",
          "last_modified_timestamp_ms": "1471744752632",
          "latitude": 39.189764,
          "longitude": -96.575858,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "1084eede227a4887864a60f3ac71b8e0.16",
          "last_modified_timestamp_ms": "1471576408145",
          "latitude": 39.189861,
          "longitude": -96.577463,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "1e2e673e468f4165aea2c14fdab25a50.16",
          "last_modified_timestamp_ms": "1470247256215",
          "latitude": 39.189806,
          "longitude": -96.57655,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "5b45ce2eb3424088b80188deabb2bf15.16",
          "last_modified_timestamp_ms": "1471404572057",
          "latitude": 39.192215,
          "longitude": -96.577861,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "6cf8d564a7d14cb7a94b75e2bdd0e26c.16",
          "last_modified_timestamp_ms": "1471795371065",
          "latitude": 39.190364,
          "longitude": -96.576983,
          "enabled": true,
          "owned_by_team": "RED",
          "guard_pokemon_id": "GYARADOS",
          "gym_points": "12426"
        },
        {
          "id": "7c59b05b095c48fabb19939fb2c81f85.16",
          "last_modified_timestamp_ms": "1471576398808",
          "latitude": 39.18987,
          "longitude": -96.577752,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "a049481adfff40c0b8e69c270e87ec2d.16",
          "last_modified_timestamp_ms": "1471795344448",
          "latitude": 39.192228,
          "longitude": -96.577043,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [
        {
          "latitude": 39.19219872050884,
          "longitude": -96.57746281751568
        }
      ],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199991593762816",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "280ff308f32c47389415a295bfa25570.16",
          "last_modified_timestamp_ms": "1471644491787",
          "latitude": 39.190921,
          "longitude": -96.590022,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "5d5ff9103187497db10a2e78b601fb67.16",
          "last_modified_timestamp_ms": "1471800441422",
          "latitude": 39.189845,
          "longitude": -96.58905,
          "enabled": true,
          "owned_by_team": "RED",
          "guard_pokemon_id": "SNORLAX",
          "gym_points": "24751",
          "is_in_battle": true
        },
        {
          "id": "a3ac1ce89c4a4e688d96aa6edb0be076.16",
          "last_modified_timestamp_ms": "1471792115365",
          "latitude": 39.189731,
          "longitude": -96.590123,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199985151311872",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [],
      "spawn_points": [],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199974413893632",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [],
      "spawn_points": [
        {
          "latitude": 39.193469215706344,
          "longitude": -96.5864720716297
        }
      ],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199967971442688",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "6d585fd260a14672a6c8e81a5ef1c00f.16",
          "last_modified_timestamp_ms": "1471026510451",
          "latitude": 39.192223,
          "longitude": -96.584249,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "7eefc291c5684a58bd430d00bb4a02fa.16",
          "last_modified_timestamp_ms": "1471782735236",
          "latitude": 39.192495,
          "longitude": -96.586269,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "93301f0081ba479195e2e8199d245319.16",
          "last_modified_timestamp_ms": "1470677059027",
          "latitude": 39.192929,
          "longitude": -96.583742,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "9ef09b3d6de848bc85345a8ed87eaadd.16",
          "last_modified_timestamp_ms": "1471557306995",
          "latitude": 39.194114,
          "longitude": -96.58532,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "ac607a7add254949b1793a333c14b5ee.16",
          "last_modified_timestamp_ms": "1470754949012",
          "latitude": 39.19312,
          "longitude": -96.585216,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [
        {
          "latitude": 39.19275534975167,
          "longitude": -96.58622179738788
        },
        {
          "latitude": 39.19327371754913,
          "longitude": -96.5856378279749
        },
        {
          "latitude": 39.19351638961815,
          "longitude": -96.5856378279749
        }
      ],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199980856344576",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "0375a78fbe6d47d4a218835fb2cf2526.16",
          "last_modified_timestamp_ms": "1471038056307",
          "latitude": 39.188371,
          "longitude": -96.584562,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "4cc6cfa975874931bf3377c999359c56.16",
          "last_modified_timestamp_ms": "1470936587696",
          "latitude": 39.186824,
          "longitude": -96.584704,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "98ee4e63753347dca11ae6e6aa204867.16",
          "last_modified_timestamp_ms": "1469037682295",
          "latitude": 39.187161,
          "longitude": -96.585232,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "9c7333626aff4c9a995ae8ae5b859bc0.11",
          "last_modified_timestamp_ms": "1471757750681",
          "latitude": 39.186809,
          "longitude": -96.583773,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "ef51b905d9594d52a6c0df2bccfd7a40.16",
          "last_modified_timestamp_ms": "1471749668125",
          "latitude": 39.187588,
          "longitude": -96.585254,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199983003828224",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "f25f5bb62ee74185b35180024f17434c.16",
          "last_modified_timestamp_ms": "1471550764849",
          "latitude": 39.186555,
          "longitude": -96.586559,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199976561377280",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [],
      "spawn_points": [],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199978708860928",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "03a289706b324e5ca289e77d0f03733f.16",
          "last_modified_timestamp_ms": "1471298173282",
          "latitude": 39.190998,
          "longitude": -96.584099,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "601d019e865b46e9a62934a4417dc4ee.16",
          "last_modified_timestamp_ms": "1471555931903",
          "latitude": 39.190639,
          "longitude": -96.584886,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "614e1b214a1844849dfbc8d14ee9e443.11",
          "last_modified_timestamp_ms": "1471651642493",
          "latitude": 39.190475,
          "longitude": -96.584527,
          "enabled": true,
          "type": "CHECKPOINT",
          "cooldown_complete_timestamp_ms": "1471780158665"
        },
        {
          "id": "97dad10ec7c74b498e3ce449cf167fe8.16",
          "last_modified_timestamp_ms": "1471732087850",
          "latitude": 39.190583,
          "longitude": -96.586108,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "ac4ab9e172c440f18ae0f37855d45efc.16",
          "last_modified_timestamp_ms": "1471800306431",
          "latitude": 39.19038,
          "longitude": -96.584106,
          "enabled": true,
          "owned_by_team": "RED",
          "guard_pokemon_id": "VAPOREON",
          "gym_points": "22697"
        },
        {
          "id": "f810680ded144b9c9e258cad59584932.11",
          "last_modified_timestamp_ms": "1470559731922",
          "latitude": 39.189884,
          "longitude": -96.584104,
          "enabled": true,
          "type": "CHECKPOINT",
          "cooldown_complete_timestamp_ms": "1471780084584"
        }
      ],
      "spawn_points": [],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199955086540800",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "14e9f2671f2a44f68011ad29f2207018.16",
          "last_modified_timestamp_ms": "1470316275511",
          "latitude": 39.191213,
          "longitude": -96.581955,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "282d96b677a74610a4d5ee7815009411.16",
          "last_modified_timestamp_ms": "1470487074907",
          "latitude": 39.190158,
          "longitude": -96.58178,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "53a79f5b2cdd44718e31b9c40013da7b.16",
          "last_modified_timestamp_ms": "1471585616392",
          "latitude": 39.192012,
          "longitude": -96.581328,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "5999459ff2d340078828ef072ec0ef9c.16",
          "last_modified_timestamp_ms": "1470234749934",
          "latitude": 39.191629,
          "longitude": -96.58323,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "99b7abe5c415420fa76eca762921a252.11",
          "last_modified_timestamp_ms": "1471622037923",
          "latitude": 39.190233,
          "longitude": -96.58131,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "a4fa0dde26464b30b1cde9ab98be0918.11",
          "last_modified_timestamp_ms": "1471718373154",
          "latitude": 39.190089,
          "longitude": -96.58322,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "ad6f130078154fbb922cc525ab30d106.11",
          "last_modified_timestamp_ms": "1471405146419",
          "latitude": 39.189808,
          "longitude": -96.581257,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "c86bc747a0fe48bc96aa9008622540f8.16",
          "last_modified_timestamp_ms": "1470561775245",
          "latitude": 39.189609,
          "longitude": -96.58247,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "f566caf28e1047a6bad2ac0d654239ac.16",
          "last_modified_timestamp_ms": "1471529893584",
          "latitude": 39.191381,
          "longitude": -96.581713,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [
        {
          "latitude": 39.1896124600141,
          "longitude": -96.58171702892608
        },
        {
          "latitude": 39.189726350923266,
          "longitude": -96.58113310075188
        },
        {
          "latitude": 39.19181546751814,
          "longitude": -96.58138335502902
        },
        {
          "latitude": 39.19198668072476,
          "longitude": -96.58121651873516
        },
        {
          "latitude": 39.19182960806035,
          "longitude": -96.58113310075188
        },
        {
          "latitude": 39.19196311246427,
          "longitude": -96.58163361028815
        },
        {
          "latitude": 39.191967826248934,
          "longitude": -96.58155019175932
        },
        {
          "latitude": 39.19198196720522,
          "longitude": -96.58129993682753
        },
        {
          "latitude": 39.19190578772032,
          "longitude": -96.58121651873516
        },
        {
          "latitude": 39.19150132114832,
          "longitude": -96.58121651873516
        },
        {
          "latitude": 39.191753428225304,
          "longitude": -96.58104968287773
        },
        {
          "latitude": 39.19126806675631,
          "longitude": -96.58104968287773
        },
        {
          "latitude": 39.19183432144186,
          "longitude": -96.58104968287773
        },
        {
          "latitude": 39.19134896059277,
          "longitude": -96.58104968287773
        },
        {
          "latitude": 39.19159164148224,
          "longitude": -96.58104968287773
        },
        {
          "latitude": 39.19109685199338,
          "longitude": -96.58121651873516
        },
        {
          "latitude": 39.19116831898037,
          "longitude": -96.58138335502902
        },
        {
          "latitude": 39.189811960033076,
          "longitude": -96.58104968287773
        },
        {
          "latitude": 39.18996432461859,
          "longitude": -96.58121651873516
        }
      ],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199957234024448",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "155dc7e5f0054faa81ea56c6e8c54f68.16",
          "last_modified_timestamp_ms": "1471458301136",
          "latitude": 39.189603,
          "longitude": -96.578715,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "217e9c24680541e89b8a432a7552ae1b.16",
          "last_modified_timestamp_ms": "1471787760082",
          "latitude": 39.1905,
          "longitude": -96.579088,
          "enabled": true,
          "owned_by_team": "RED",
          "guard_pokemon_id": "VAPOREON",
          "gym_points": "18423"
        },
        {
          "id": "30f6dbee9eeb4e0e979a99741cf3304d.16",
          "last_modified_timestamp_ms": "1471573445404",
          "latitude": 39.191939,
          "longitude": -96.578589,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "4807de0920154dabaadf0cad98b3d0b9.16",
          "last_modified_timestamp_ms": "1471630498363",
          "latitude": 39.190973,
          "longitude": -96.580973,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "5408fa0fd76145c8a3c5c61b1ea2bceb.11",
          "last_modified_timestamp_ms": "1471465165042",
          "latitude": 39.190004,
          "longitude": -96.579479,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "5b451cde8f18433f88414789ae7ce55f.11",
          "last_modified_timestamp_ms": "1471719704625",
          "latitude": 39.191467,
          "longitude": -96.580898,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "62d85d9b92654a99aae85980d62aa895.16",
          "last_modified_timestamp_ms": "1471411498696",
          "latitude": 39.19141,
          "longitude": -96.579584,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "6b8ac3edccc64837b9898b9a1029761a.16",
          "last_modified_timestamp_ms": "1471650819287",
          "latitude": 39.191529,
          "longitude": -96.579846,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "a2710e9d1a3f440bb3796a8e0d0f7653.12",
          "last_modified_timestamp_ms": "1471720350458",
          "latitude": 39.190489,
          "longitude": -96.580542,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "a319260fdfa04545b4d09c5f4d649d1a.11",
          "last_modified_timestamp_ms": "1471463408586",
          "latitude": 39.189828,
          "longitude": -96.580015,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "f01cb9e600444afc8f4681977ce2930e.16",
          "last_modified_timestamp_ms": "1471645573471",
          "latitude": 39.192106,
          "longitude": -96.579022,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [
        {
          "latitude": 39.19008763820493,
          "longitude": -96.58046576081381
        },
        {
          "latitude": 39.18998789088006,
          "longitude": -96.58079942990994
        },
        {
          "latitude": 39.1913772393915,
          "longitude": -96.58054917792418
        },
        {
          "latitude": 39.191201312497725,
          "longitude": -96.58079942990994
        },
        {
          "latitude": 39.18999260393353,
          "longitude": -96.58071601247224
        },
        {
          "latitude": 39.189906995279046,
          "longitude": -96.58079942990994
        },
        {
          "latitude": 39.189559067794576,
          "longitude": -96.57979842785916
        },
        {
          "latitude": 39.190163820750165,
          "longitude": -96.58054917792418
        },
        {
          "latitude": 39.19135367389158,
          "longitude": -96.58096626511268
        },
        {
          "latitude": 39.19154373969393,
          "longitude": -96.58046576081381
        },
        {
          "latitude": 39.19122016447811,
          "longitude": -96.58046576081381
        },
        {
          "latitude": 39.19169138774681,
          "longitude": -96.58071601247224
        },
        {
          "latitude": 39.19169610079146,
          "longitude": -96.58063259514365
        },
        {
          "latitude": 39.191943493468735,
          "longitude": -96.58054917792418
        },
        {
          "latitude": 39.191372526424075,
          "longitude": -96.58063259514365
        },
        {
          "latitude": 39.1901732464041,
          "longitude": -96.58038234381257
        }
      ],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199950791573504",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "3ddc92da8fba4e24b967d5216da68d8a.16",
          "last_modified_timestamp_ms": "1470507065167",
          "latitude": 39.189333,
          "longitude": -96.58045,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "48715a49e53f406d96f77e22b5f91415.11",
          "last_modified_timestamp_ms": "1471717500458",
          "latitude": 39.187914,
          "longitude": -96.580012,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "57b640b14e234607bfb04d3d66d841fd.16",
          "last_modified_timestamp_ms": "1471039597671",
          "latitude": 39.187895,
          "longitude": -96.579301,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "88e61d1f13294c6098122e3213780f0b.16",
          "last_modified_timestamp_ms": "1471525597252",
          "latitude": 39.187657,
          "longitude": -96.578385,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "c1ba5f8eda744d0aa49ca389c23c60d5.11",
          "last_modified_timestamp_ms": "1471551825715",
          "latitude": 39.188057,
          "longitude": -96.58098,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "ce7fae6154004f21a986aa0483d829ae.16",
          "last_modified_timestamp_ms": "1471790729135",
          "latitude": 39.189402,
          "longitude": -96.578673,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "d4547cbebd4f400dbf150af82347ef08.16",
          "last_modified_timestamp_ms": "1470111292530",
          "latitude": 39.189,
          "longitude": -96.57907,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "d9a15d395b0e42efb8641af0f9070f7f.16",
          "last_modified_timestamp_ms": "1469915007418",
          "latitude": 39.188439,
          "longitude": -96.580529,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [
        {
          "latitude": 39.18870768769649,
          "longitude": -96.58054917792418
        },
        {
          "latitude": 39.189330515225215,
          "longitude": -96.5795481798016
        },
        {
          "latitude": 39.18877366101736,
          "longitude": -96.57938134830886
        },
        {
          "latitude": 39.18740389337131,
          "longitude": -96.58071601247224
        },
        {
          "latitude": 39.188307913149515,
          "longitude": -96.58046576081381
        },
        {
          "latitude": 39.188992791848875,
          "longitude": -96.57979842785916
        },
        {
          "latitude": 39.188017309051496,
          "longitude": -96.57988184409656
        },
        {
          "latitude": 39.18825529074279,
          "longitude": -96.57996526044312
        },
        {
          "latitude": 39.18826942753547,
          "longitude": -96.57971501173085
        },
        {
          "latitude": 39.188250578346015,
          "longitude": -96.58004867689877
        },
        {
          "latitude": 39.18863150324239,
          "longitude": -96.58046576081381
        }
      ],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199952939057152",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
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
          "last_modified_timestamp_ms": "1471743176808",
          "latitude": 39.188008,
          "longitude": -96.582409,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "637941f1f2494276884ede4fc538c2b2.16",
          "last_modified_timestamp_ms": "1471757787582",
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
      ],
      "spawn_points": [
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
      ],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [
        {
          "encounter_id": "15124390125922157165",
          "last_modified_timestamp_ms": new Date().getTime(),
          "latitude": 39.1882905753091,
          "longitude": -96.58363568771144,
          "spawn_point_id": "87bdcd88cb5",
          "pokemon_data": {
            "pokemon_id": "MEWTWO"
          },
          "time_till_hidden_ms": 20000
        },
        {
          "encounter_id": "15124390125922157169",
          "last_modified_timestamp_ms": new Date().getTime(),
          "latitude": 39.1884905743091,
          "longitude": -96.58363568761144,
          "spawn_point_id": "87bdcd88cb5",
          "pokemon_data": {
            "pokemon_id": "MEW"
          },
          "time_till_hidden_ms": 30000
        },
        {
          "encounter_id": "15124390125922157129",
          "last_modified_timestamp_ms": new Date().getTime(),
          "latitude": 39.1884905743091,
          "longitude": -96.58343568761143,
          "spawn_point_id": "87bdcd88cb5",
          "pokemon_data": {
            "pokemon_id": "ZAPDOS"
          },
          "time_till_hidden_ms": 40000
        }
      ],
      "catchable_pokemons": [
        {
          "spawn_point_id": "87bdcd88cb5",
          "encounter_id": "15124390125922157165",
          "pokemon_id": "MEWTWO",
          "expiration_timestamp_ms": "1471800475092",
          "latitude": 39.1882905753091,
          "longitude": -96.58363568771144
        },
        {
          "spawn_point_id": "87bdcd88cb5",
          "encounter_id": "15124390125922157169",
          "pokemon_id": "MEW",
          "expiration_timestamp_ms": "1471800475092",
          "latitude": 39.1884905743091,
          "longitude": -96.58363568761144
        },
        {
          "spawn_point_id": "87bdcd88cb5",
          "encounter_id": "15124390125922157129",
          "pokemon_id": "ZAPDOS",
          "expiration_timestamp_ms": "1471800475092",
          "latitude": 39.1884905743091,
          "longitude": -96.58343568761143
        }
      ],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199965823959040",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "2715ee21d0844c6fbb0fda3a2029e945.16",
          "last_modified_timestamp_ms": "1471710797897",
          "latitude": 39.192669,
          "longitude": -96.583311,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "4cd3b930af1a4f248f6c01af748115bd.16",
          "last_modified_timestamp_ms": "1471575743600",
          "latitude": 39.192082,
          "longitude": -96.582129,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "66fd7861f1794235a8b4ab9e75abdff8.16",
          "last_modified_timestamp_ms": "1471364750124",
          "latitude": 39.193544,
          "longitude": -96.583396,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "80948d46cb744685b00f3f6923ac65bc.16",
          "last_modified_timestamp_ms": "1471293569339",
          "latitude": 39.194292,
          "longitude": -96.582015,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "b54e269be87c49478d27d8bef6018f58.11",
          "last_modified_timestamp_ms": "1470692404303",
          "latitude": 39.192906,
          "longitude": -96.581716,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "ded8ab4bc4a9473a9679d3c12f0ea852.16",
          "last_modified_timestamp_ms": "1471585725951",
          "latitude": 39.192085,
          "longitude": -96.581052,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [
        {
          "latitude": 39.192044005351725,
          "longitude": -96.58163361028815
        },
        {
          "latitude": 39.192020435420545,
          "longitude": -96.58205070456887
        }
      ],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199959381508096",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "751ec666414247d78fd259028f701590.16",
          "last_modified_timestamp_ms": "1471012618815",
          "latitude": 39.194234,
          "longitude": -96.579903,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "7f4aa8a610aa4d9db68a36bec83fd745.16",
          "last_modified_timestamp_ms": "1471573864363",
          "latitude": 39.192719,
          "longitude": -96.579799,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "bbdf4444583546d9b2b729ec5d45537e.11",
          "last_modified_timestamp_ms": "1471797235873",
          "latitude": 39.193056,
          "longitude": -96.579455,
          "enabled": true,
          "owned_by_team": "BLUE",
          "guard_pokemon_id": "VAPOREON",
          "gym_points": "4000"
        },
        {
          "id": "d7812fa64a4942d2ab6d7df3190cd0a6.11",
          "last_modified_timestamp_ms": "1471645568026",
          "latitude": 39.192212,
          "longitude": -96.579514,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [
        {
          "latitude": 39.1944071543913,
          "longitude": -96.57846378290101
        },
        {
          "latitude": 39.19441186573404,
          "longitude": -96.5783803685187
        }
      ],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199937906671616",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [],
      "spawn_points": [],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199940054155264",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "116fe592ee124bc782189e3b236543b9.16",
          "last_modified_timestamp_ms": "1471789051235",
          "latitude": 39.186487,
          "longitude": -96.585603,
          "enabled": true,
          "owned_by_team": "RED",
          "guard_pokemon_id": "DRAGONITE",
          "gym_points": "10034"
        },
        {
          "id": "7516ab5a89b2456fa3b3454d94308c2f.16",
          "last_modified_timestamp_ms": "1471569169549",
          "latitude": 39.185858,
          "longitude": -96.585593,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "9315a6c61b294fffa453593262784d42.16",
          "last_modified_timestamp_ms": "1470527342920",
          "latitude": 39.186378,
          "longitude": -96.584565,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "ca827e78a2514218ab70bb407ef0b798.16",
          "last_modified_timestamp_ms": "1471781381973",
          "latitude": 39.186659,
          "longitude": -96.583743,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199948644089856",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "0c73510c66ed4bcfa92f77df2d7dc7f0.11",
          "last_modified_timestamp_ms": "1470924273803",
          "latitude": 39.186695,
          "longitude": -96.580794,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "111a01218f71427482ef2afb4655110b.16",
          "last_modified_timestamp_ms": "1471495631668",
          "latitude": 39.185378,
          "longitude": -96.578626,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "1af804d6d5214911913d88b33af581ad.16",
          "last_modified_timestamp_ms": "1471799300878",
          "latitude": 39.186628,
          "longitude": -96.578443,
          "enabled": true,
          "owned_by_team": "YELLOW",
          "guard_pokemon_id": "FLAREON",
          "gym_points": "4000"
        },
        {
          "id": "77feee0994214897a3b6dce58a3ad4dd.16",
          "last_modified_timestamp_ms": "1471765255682",
          "latitude": 39.185924,
          "longitude": -96.578763,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "7b1208b02f6843889c52fb7d1d569ecc.11",
          "last_modified_timestamp_ms": "1470039557132",
          "latitude": 39.186489,
          "longitude": -96.579886,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "cc692d8b24f64244884d9481e9c83ebd.16",
          "last_modified_timestamp_ms": "1468345908021",
          "latitude": 39.186268,
          "longitude": -96.579524,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    },
    {
      "s2_cell_id": "9781199942201638912",
      "current_timestamp_ms": new Date().getTime(),
      "forts": [
        {
          "id": "1e81f35de1f34fd994c320332497705f.16",
          "last_modified_timestamp_ms": "1471781376676",
          "latitude": 39.186289,
          "longitude": -96.583305,
          "enabled": true,
          "type": "CHECKPOINT"
        },
        {
          "id": "cd1b34b754cb4a33add1dacb7f161177.16",
          "last_modified_timestamp_ms": "1471726904495",
          "latitude": 39.18591,
          "longitude": -96.581364,
          "enabled": true,
          "type": "CHECKPOINT"
        }
      ],
      "spawn_points": [
        {
          "latitude": 39.18646686734363,
          "longitude": -96.58155019175932
        }
      ],
      "deleted_objects": [],
      "fort_summaries": [],
      "decimated_spawn_points": [],
      "wild_pokemons": [],
      "catchable_pokemons": [],
      "nearby_pokemons": []
    }
  ],
  "status": "SUCCESS",
  "$unknownFields": []
});

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetMapObjectsResponse"));

}