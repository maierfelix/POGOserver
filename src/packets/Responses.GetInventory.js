import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

let isFirst = false;

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function GetInventoryData(obj) {

  let buffer = ({
  "success": true,
  "inventory_delta": {
    "new_timestamp_ms": new Date().getTime(),
    "inventory_items": [
      {
        "modified_timestamp_ms": "1471712450083",
        "inventory_item_data": {
          "pokemon_data": {
            "id": "18084643178451338494",
            "pokemon_id": "JIGGLYPUFF",
            "cp": 132,
            "stamina": 74,
            "stamina_max": 74,
            "move_1": "FEINT_ATTACK_FAST",
            "move_2": "BODY_SLAM",
            "height_m": 0.4980907142162323,
            "weight_kg": 5.8239665031433105,
            "individual_attack": 9,
            "individual_defense": 8,
            "individual_stamina": 1,
            "cp_multiplier": 0.3210875988006592,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471692765854"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "FEAROW",
            "times_encountered": 1,
            "times_captured": 1
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "15921933050191214559",
            "pokemon_id": "RATTATA",
            "cp": 37,
            "stamina": 14,
            "stamina_max": 14,
            "move_1": "QUICK_ATTACK_FAST",
            "move_2": "BODY_SLAM",
            "height_m": 0.335340678691864,
            "weight_kg": 3.9603395462036133,
            "individual_attack": 15,
            "individual_defense": 2,
            "individual_stamina": 6,
            "cp_multiplier": 0.21573247015476227,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471689904105"
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_SLOWPOKE",
            "candy": 3
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "EKANS",
            "times_encountered": 2,
            "times_captured": 2
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "10181525078482818464",
            "is_egg": true,
            "egg_km_walked_target": 5,
            "captured_cell_id": "9926767136558022656",
            "creation_time_ms": "1471691580646"
          }
        }
      },
      {
        "inventory_item_data": {
          "item": {
            "item_id": "ITEM_REVIVE",
            "count": 20
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "3728701318451962436",
            "pokemon_id": "STARYU",
            "cp": 13,
            "stamina": 10,
            "stamina_max": 10,
            "move_1": "WATER_GUN_FAST",
            "move_2": "BUBBLE_BEAM",
            "height_m": 0.861968457698822,
            "weight_kg": 41.78410720825195,
            "individual_attack": 14,
            "individual_defense": 15,
            "individual_stamina": 15,
            "cp_multiplier": 0.09399999678134918,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471692483936"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "NIDORAN_FEMALE",
            "times_encountered": 2,
            "times_captured": 2
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "12449080423906283031",
            "pokemon_id": "PIDGEOTTO",
            "cp": 80,
            "stamina": 28,
            "stamina_max": 28,
            "move_1": "WING_ATTACK_FAST",
            "move_2": "TWISTER",
            "height_m": 1.24424409866333,
            "weight_kg": 38.75220489501953,
            "individual_attack": 10,
            "individual_defense": 3,
            "individual_stamina": 5,
            "cp_multiplier": 0.21573247015476227,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471691535997"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "NIDORINO",
            "times_encountered": 1,
            "times_captured": 1
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "CLEFAIRY",
            "times_encountered": 2,
            "times_captured": 2
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_MAGIKARP",
            "candy": 19
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "JIGGLYPUFF",
            "times_encountered": 1,
            "times_captured": 1
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "14072353163410837297",
            "pokemon_id": "MAGIKARP",
            "cp": 26,
            "stamina": 13,
            "stamina_max": 13,
            "move_1": "SPLASH_FAST",
            "move_2": "STRUGGLE",
            "height_m": 0.797365128993988,
            "weight_kg": 7.1520256996154785,
            "individual_attack": 13,
            "individual_defense": 13,
            "individual_stamina": 14,
            "cp_multiplier": 0.2557200491428375,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926593976904712192",
            "creation_time_ms": "1471695195481",
            "from_fort": 1
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "ZUBAT",
            "times_encountered": 8,
            "times_captured": 8
          }
        }
      },
      {
        "inventory_item_data": {
          "item": {
            "item_id": "ITEM_RAZZ_BERRY",
            "count": 21
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_KRABBY",
            "candy": 7
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "GOLBAT",
            "times_encountered": 2,
            "times_captured": 2
          }
        }
      },
      {
        "modified_timestamp_ms": "1471712450083",
        "inventory_item_data": {
          "pokemon_data": {
            "id": "9506392224876742817",
            "pokemon_id": "FEAROW",
            "cp": 311,
            "stamina": 22,
            "stamina_max": 49,
            "move_1": "STEEL_WING_FAST",
            "move_2": "TWISTER",
            "height_m": 1.0706182718276978,
            "weight_kg": 35.038177490234375,
            "individual_attack": 4,
            "individual_defense": 10,
            "individual_stamina": 11,
            "cp_multiplier": 0.3492126762866974,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471693184039"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "PARAS",
            "times_encountered": 3,
            "times_captured": 3
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_CUBONE",
            "candy": 3
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "VENONAT",
            "times_encountered": 1
          }
        }
      },
      {
        "modified_timestamp_ms": "1471712450083",
        "inventory_item_data": {
          "pokemon_data": {
            "id": "18365393771243280355",
            "pokemon_id": "NIDORINO",
            "cp": 170,
            "stamina": 38,
            "stamina_max": 38,
            "move_1": "POISON_STING_FAST",
            "move_2": "HORN_ATTACK",
            "height_m": 0.8500931262969971,
            "weight_kg": 15.523972511291504,
            "individual_attack": 11,
            "individual_defense": 4,
            "individual_stamina": 11,
            "cp_multiplier": 0.29024988412857056,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471693450255"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "17518952308967699010",
            "pokemon_id": "GROWLITHE",
            "cp": 128,
            "stamina": 28,
            "stamina_max": 28,
            "move_1": "BITE_FAST",
            "move_2": "FLAMETHROWER",
            "height_m": 0.7787603735923767,
            "weight_kg": 28.37158966064453,
            "individual_attack": 12,
            "individual_defense": 14,
            "individual_stamina": 1,
            "cp_multiplier": 0.2557200491428375,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926594385212866560",
            "creation_time_ms": "1471691371843"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "GROWLITHE",
            "times_encountered": 1,
            "times_captured": 1
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_HORSEA",
            "candy": 11
          }
        }
      },
      {
        "modified_timestamp_ms": "1471712450083",
        "inventory_item_data": {
          "pokemon_data": {
            "id": "15271685633708968048",
            "pokemon_id": "GOLBAT",
            "cp": 191,
            "stamina": 41,
            "stamina_max": 41,
            "move_1": "BITE_FAST",
            "move_2": "AIR_CUTTER",
            "height_m": 1.7463443279266357,
            "weight_kg": 65.05073547363281,
            "individual_attack": 11,
            "individual_defense": 10,
            "individual_stamina": 11,
            "cp_multiplier": 0.2557200491428375,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471692231329",
            "from_fort": 1
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_GOLDEEN",
            "candy": 7
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "796318518081224862",
            "pokemon_id": "KRABBY",
            "cp": 100,
            "stamina": 21,
            "stamina_max": 21,
            "move_1": "MUD_SHOT_FAST",
            "move_2": "VICE_GRIP",
            "height_m": 0.26345697045326233,
            "weight_kg": 2.924619197845459,
            "individual_attack": 10,
            "individual_defense": 14,
            "individual_stamina": 13,
            "cp_multiplier": 0.29024988412857056,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471694904167"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "12036095042499738126",
            "pokemon_id": "NIDORAN_FEMALE",
            "cp": 103,
            "stamina": 36,
            "stamina_max": 36,
            "move_1": "POISON_STING_FAST",
            "move_2": "POISON_FANG",
            "height_m": 0.3868274390697479,
            "weight_kg": 8.206711769104004,
            "individual_attack": 2,
            "individual_defense": 13,
            "individual_stamina": 15,
            "cp_multiplier": 0.29024988412857056,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471691674295"
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_STARYU",
            "candy": 7
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "10747118668044541405",
            "pokemon_id": "WEEDLE",
            "cp": 29,
            "stamina": 17,
            "stamina_max": 17,
            "move_1": "POISON_STING_FAST",
            "move_2": "STRUGGLE",
            "height_m": 0.3058975636959076,
            "weight_kg": 3.337272882461548,
            "individual_attack": 14,
            "individual_defense": 12,
            "individual_stamina": 1,
            "cp_multiplier": 0.21573247015476227,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471693994993"
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_PINSIR",
            "candy": 3
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_CHARMANDER",
            "candy": 3
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "SLOWPOKE",
            "times_encountered": 1,
            "times_captured": 1
          }
        }
      },
      {
        "modified_timestamp_ms": "1471712450083",
        "inventory_item_data": {
          "pokemon_data": {
            "id": "9152935995874346712",
            "pokemon_id": "SLOWPOKE",
            "cp": 191,
            "stamina": 59,
            "stamina_max": 59,
            "move_1": "WATER_GUN_FAST",
            "move_2": "WATER_PULSE",
            "height_m": 1.570439338684082,
            "weight_kg": 60.640960693359375,
            "individual_attack": 14,
            "individual_defense": 11,
            "individual_stamina": 5,
            "cp_multiplier": 0.3210875988006592,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471692254852"
          }
        }
      },
      {
        "inventory_item_data": {
          "egg_incubators": {
            "egg_incubator": [
              {
                "id": "EggIncubatorProto-1762299759591784113",
                "item_id": "ITEM_INCUBATOR_BASIC_UNLIMITED",
                "incubator_type": "INCUBATOR_DISTANCE"
              },
              {
                "id": "EggIncubatorProto-2555040734197054659",
                "item_id": "ITEM_INCUBATOR_BASIC",
                "incubator_type": "INCUBATOR_DISTANCE",
                "uses_remaining": 3,
                "pokemon_id": "11744424908786525656",
                "start_km_walked": 2.1090078353881836,
                "target_km_walked": 12.109007835388184
              }
            ]
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_CATERPIE",
            "candy": 19
          }
        }
      },
      {
        "inventory_item_data": {
          "item": {
            "item_id": "ITEM_INCENSE_ORDINARY",
            "count": 4
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_WEEDLE",
            "candy": 19
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "6139375183589489982",
            "pokemon_id": "GOLDEEN",
            "cp": 68,
            "stamina": 21,
            "stamina_max": 21,
            "move_1": "MUD_SHOT_FAST",
            "move_2": "HORN_ATTACK",
            "height_m": 0.6158193349838257,
            "weight_kg": 17.450626373291016,
            "individual_attack": 14,
            "individual_defense": 15,
            "individual_stamina": 8,
            "cp_multiplier": 0.21573247015476227,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471691494377"
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_PIDGEY",
            "candy": 50
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_RATTATA",
            "candy": 27
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "15065989923603533398",
            "is_egg": true,
            "egg_km_walked_target": 2,
            "captured_cell_id": "9926593978110574592",
            "creation_time_ms": "1471690777343"
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_SPEAROW",
            "candy": 10
          }
        }
      },
      {
        "modified_timestamp_ms": "1471712450083",
        "inventory_item_data": {
          "pokemon_data": {
            "id": "9068626531358460046",
            "pokemon_id": "CLEFAIRY",
            "cp": 150,
            "stamina": 42,
            "stamina_max": 42,
            "move_1": "ZEN_HEADBUTT_FAST",
            "move_2": "BODY_SLAM",
            "height_m": 0.6027987003326416,
            "weight_kg": 7.181642532348633,
            "individual_attack": 14,
            "individual_defense": 5,
            "individual_stamina": 6,
            "cp_multiplier": 0.29024988412857056,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471693717977"
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_EKANS",
            "candy": 7
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "5410754902696943229",
            "is_egg": true,
            "egg_km_walked_target": 5,
            "captured_cell_id": "9926767137919074304",
            "creation_time_ms": "1471689786531"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "KRABBY",
            "times_encountered": 2,
            "times_captured": 2
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "14667551044177722023",
            "is_egg": true,
            "egg_km_walked_target": 2,
            "captured_cell_id": "9926767136790806528",
            "creation_time_ms": "1471691542366"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "130876558588413914",
            "is_egg": true,
            "egg_km_walked_target": 5,
            "captured_cell_id": "9926767137394786304",
            "creation_time_ms": "1471691424962"
          }
        }
      },
      {
        "inventory_item_data": {
          "item": {
            "item_id": "ITEM_INCUBATOR_BASIC_UNLIMITED",
            "count": 1,
            "unseen": true
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_NIDORAN_FEMALE",
            "candy": 7
          }
        }
      },
      {
        "modified_timestamp_ms": "1471779833610",
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "EEVEE",
            "times_encountered": 2
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_NIDORAN_MALE",
            "candy": 3
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "CUBONE",
            "times_encountered": 1,
            "times_captured": 1
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "MAGIKARP",
            "times_encountered": 4,
            "times_captured": 4
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_CLEFAIRY",
            "candy": 7
          }
        }
      },
      {
        "modified_timestamp_ms": "1471779858667",
        "inventory_item_data": {
          "item": {
            "item_id": "ITEM_POTION",
            "count": 11
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "1568499254512618339",
            "pokemon_id": "PARAS",
            "cp": 39,
            "stamina": 13,
            "stamina_max": 13,
            "move_1": "SCRATCH_FAST",
            "move_2": "X_SCISSOR",
            "height_m": 0.2907119691371918,
            "weight_kg": 5.8927106857299805,
            "individual_attack": 15,
            "individual_defense": 13,
            "individual_stamina": 12,
            "cp_multiplier": 0.16639786958694458,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926594385212866560",
            "creation_time_ms": "1471689715056"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "4260700134915739389",
            "pokemon_id": "EKANS",
            "cp": 96,
            "stamina": 21,
            "stamina_max": 21,
            "move_1": "ACID_FAST",
            "move_2": "SLUDGE_BOMB",
            "height_m": 1.5886131525039673,
            "weight_kg": 3.6353814601898193,
            "individual_attack": 12,
            "individual_defense": 6,
            "individual_stamina": 3,
            "cp_multiplier": 0.29024988412857056,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471692372606"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "10573494102072008253",
            "pokemon_id": "PIDGEY",
            "cp": 10,
            "stamina": 10,
            "stamina_max": 10,
            "move_1": "TACKLE_FAST",
            "move_2": "AERIAL_ACE",
            "height_m": 0.27786242961883545,
            "weight_kg": 1.1178309917449951,
            "individual_attack": 15,
            "individual_defense": 10,
            "individual_stamina": 4,
            "cp_multiplier": 0.09399999678134918,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471689794773"
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_JIGGLYPUFF",
            "candy": 3
          }
        }
      },
      {
        "inventory_item_data": {
          "item": {
            "item_id": "ITEM_TROY_DISK",
            "count": 1,
            "unseen": true
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_ZUBAT",
            "candy": 38
          }
        }
      },
      {
        "modified_timestamp_ms": "1471712379214",
        "inventory_item_data": {
          "pokemon_data": {
            "id": "12039497356603358386",
            "pokemon_id": "CUBONE",
            "cp": 68,
            "stamina": 1,
            "stamina_max": 22,
            "move_1": "MUD_SLAP_FAST",
            "move_2": "BONE_CLUB",
            "height_m": 0.4713166356086731,
            "weight_kg": 7.497816562652588,
            "individual_attack": 14,
            "individual_defense": 5,
            "individual_stamina": 3,
            "cp_multiplier": 0.21573247015476227,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471694222080"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "4337346407444660281",
            "is_egg": true,
            "egg_km_walked_target": 10,
            "captured_cell_id": "9926767133913513984",
            "creation_time_ms": "1471695633095"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "HORSEA",
            "times_encountered": 3,
            "times_captured": 3
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_PARAS",
            "candy": 11
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "GOLDEEN",
            "times_encountered": 2,
            "times_captured": 2
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "17588702568986129255",
            "pokemon_id": "HORSEA",
            "cp": 102,
            "stamina": 21,
            "stamina_max": 21,
            "move_1": "BUBBLE_FAST",
            "move_2": "FLASH_CANNON",
            "height_m": 0.38454344868659973,
            "weight_kg": 8.013751029968262,
            "individual_attack": 15,
            "individual_defense": 9,
            "individual_stamina": 13,
            "cp_multiplier": 0.29024988412857056,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471694597662"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "20428484146157110",
            "pokemon_id": "SPEAROW",
            "cp": 27,
            "stamina": 15,
            "stamina_max": 15,
            "move_1": "PECK_FAST",
            "move_2": "DRILL_PECK",
            "height_m": 0.29344871640205383,
            "weight_kg": 1.9293220043182373,
            "individual_attack": 10,
            "individual_defense": 5,
            "individual_stamina": 13,
            "cp_multiplier": 0.16639786958694458,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926594385212866560",
            "creation_time_ms": "1471690326729"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "9844476046022103294",
            "pokemon_id": "CHARMANDER",
            "cp": 12,
            "stamina": 10,
            "stamina_max": 10,
            "move_1": "SCRATCH_FAST",
            "move_2": "FLAMETHROWER",
            "height_m": 0.7560690641403198,
            "weight_kg": 14.30856990814209,
            "individual_attack": 10,
            "individual_defense": 10,
            "individual_stamina": 10,
            "cp_multiplier": 0.09399999678134918,
            "captured_cell_id": "10781478022840057856",
            "creation_time_ms": "1471100247635"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "STARYU",
            "times_encountered": 2,
            "times_captured": 2
          }
        }
      },
      {
        "modified_timestamp_ms": "1471779858667",
        "inventory_item_data": {
          "player_stats": {
            "level": 8,
            "experience": "32875",
            "prev_level_xp": "21000",
            "next_level_xp": "36000",
            "km_walked": 3.921541213989258,
            "pokemons_encountered": 75,
            "unique_pokedex_entries": 25,
            "pokemons_captured": 71,
            "poke_stop_visits": 123,
            "pokeballs_thrown": 74,
            "eggs_hatched": 1,
            "big_magikarp_caught": 1,
            "pokemon_deployed": 1,
            "pokemon_caught_by_type": {
              "type": "Buffer",
              "data": [
                0,
                24,
                0,
                26,
                20,
                1,
                0,
                14,
                0,
                0,
                1,
                14,
                3,
                0,
                1,
                0,
                0,
                0,
                3
              ]
            }
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "11744424908786525656",
            "is_egg": true,
            "egg_km_walked_target": 10,
            "captured_cell_id": "9926593973010300928",
            "egg_incubator_id": "EggIncubatorProto-2555040734197054659",
            "creation_time_ms": "1471690023913"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "6969639762681983910",
            "pokemon_id": "PINSIR",
            "cp": 28,
            "stamina": 13,
            "stamina_max": 13,
            "move_1": "FURY_CUTTER_FAST",
            "move_2": "SUBMISSION",
            "height_m": 1.304322361946106,
            "weight_kg": 31.694673538208008,
            "individual_attack": 13,
            "individual_defense": 2,
            "individual_stamina": 15,
            "cp_multiplier": 0.09399999678134918,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471695906137"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "PINSIR",
            "times_encountered": 1,
            "times_captured": 1
          }
        }
      },
      {
        "inventory_item_data": {
          "candy": {
            "family_id": "FAMILY_GROWLITHE",
            "candy": 3
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "CHARMANDER",
            "times_encountered": 1,
            "times_captured": 1
          }
        }
      },
      {
        "inventory_item_data": {
          "item": {
            "item_id": "ITEM_INCUBATOR_BASIC",
            "count": 1,
            "unseen": true
          }
        }
      },
      {
        "modified_timestamp_ms": new Date().getTime(),
        "inventory_item_data": {
          "item": {
            "item_id": "ITEM_POKE_BALL",
            "count": 209
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "5976745051113111367",
            "pokemon_id": "CATERPIE",
            "cp": 49,
            "stamina": 26,
            "stamina_max": 26,
            "move_1": "BUG_BITE_FAST",
            "move_2": "STRUGGLE",
            "height_m": 0.24649560451507568,
            "weight_kg": 1.6669996976852417,
            "individual_attack": 11,
            "individual_defense": 5,
            "cp_multiplier": 0.29024988412857056,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471691567691"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "CATERPIE",
            "times_encountered": 5,
            "times_captured": 5
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "WEEDLE",
            "times_encountered": 5,
            "times_captured": 5
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "11858657374888779686",
            "is_egg": true,
            "egg_km_walked_target": 2,
            "captured_cell_id": "9926593977120718848",
            "creation_time_ms": "1471689730292"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "PIDGEY",
            "times_encountered": 13,
            "times_captured": 12
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "PIDGEOTTO",
            "times_encountered": 1,
            "times_captured": 1
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "17367836743335105913",
            "is_egg": true,
            "egg_km_walked_target": 5,
            "captured_cell_id": "9926593976665636864",
            "creation_time_ms": "1471689736014"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokemon_data": {
            "id": "276965584718075753",
            "pokemon_id": "ZUBAT",
            "cp": 62,
            "stamina": 23,
            "stamina_max": 23,
            "move_1": "BITE_FAST",
            "move_2": "SLUDGE_BOMB",
            "height_m": 0.8217771649360657,
            "weight_kg": 8.549221992492676,
            "individual_attack": 11,
            "individual_defense": 14,
            "individual_stamina": 10,
            "cp_multiplier": 0.2557200491428375,
            "pokeball": "ITEM_POKE_BALL",
            "captured_cell_id": "9926768108050055168",
            "creation_time_ms": "1471694026807"
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "RATTATA",
            "times_encountered": 7,
            "times_captured": 7
          }
        }
      },
      {
        "inventory_item_data": {
          "pokedex_entry": {
            "pokemon_id": "SPEAROW",
            "times_encountered": 2,
            "times_captured": 2
          }
        }
      }
    ]
  },
  "$unknownFields": []
});

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetInventoryResponse"));

}