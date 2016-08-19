import CFG from "../../cfg";

import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function ItemTemplates(obj) {

  return (
    new proto.Networking.Responses.DownloadItemTemplatesResponse({
      success: true,
      item_templates: new proto.Networking.Responses.DownloadItemTemplatesResponse.ItemTemplate({
        pokemon_settings: null,
        item_settings: null,
        move_settings: null,
        move_sequence_settings: null,
        camera: null,
        iap_item_display: null,
        equipped_badges: null,
        type_effective: new proto.Settings.Master.TypeEffectiveSettings({
          "attack_scalar": [1, 0.800000011920929, 0.800000011920929, 0.800000011920929, 1, 1, 1, 0.800000011920929, 0.800000011920929, 0.800000011920929, 1, 1.25, 1, 1.25, 1, 1, 1.25, 0.800000011920929],
          "attack_type": 7
        }),
        badge_settings: new proto.Settings.Master.BadgeSettings({
          "badge_type": 13,
          "badge_rank": 4,
          "targets": [10, 100, 1000]
        }),
        player_level: new proto.Settings.Master.PlayerLevelSettings({
          "rank_num": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          "required_experience": [0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000, 65000, 75000, 85000, 100000, 120000, 140000, 160000, 185000, 210000, 260000, 335000, 435000, 560000, 710000, 900000, 1100000, 1350000, 1650000, 2000000, 2500000, 3000000, 3750000, 4750000, 6000000, 7500000, 9500000, 12000000, 15000000, 20000000],
          "cp_multiplier": [0.09399999678134918, 0.16639786958694458, 0.21573247015476227, 0.2557200491428375, 0.29024988412857056, 0.3210875988006592, 0.3492126762866974, 0.37523558735847473, 0.39956727623939514, 0.42250001430511475, 0.443107545375824, 0.4627983868122101, 0.48168495297431946, 0.49985843896865845, 0.517393946647644, 0.5343543291091919, 0.5507926940917969, 0.5667545199394226, 0.5822789072990417, 0.5974000096321106, 0.6121572852134705, 0.6265671253204346, 0.6406529545783997, 0.6544356346130371, 0.667934000492096, 0.6811649203300476, 0.6941436529159546, 0.7068842053413391, 0.719399094581604, 0.7317000031471252, 0.7377694845199585, 0.7437894344329834, 0.7497610449790955, 0.7556855082511902, 0.7615638375282288, 0.7673971652984619, 0.7731865048408508, 0.7789327502250671, 0.7846369743347168, 0.7903000116348267],
          "max_egg_player_level": 20,
          "max_encounter_player_level": 30
        }),
        gym_level: new proto.Settings.Master.GymLevelSettings({
          "required_experience": [0, 2000, 4000, 8000, 12000, 16000, 20000, 30000, 40000, 50000],
          "leader_slots": [1, 1, 1, 2, 2, 2, 3, 3, 3, 4],
          "trainer_slots": [0, 1, 2, 2, 3, 4, 4, 5, 6, 6],
          "search_roll_bonus": []
        }),
        battle_settings: new proto.Settings.Master.GymBattleSettings({
          "energy_per_sec": 0,
          "dodge_energy_cost": 0,
          "retarget_seconds": 0.5,
          "enemy_attack_interval": 1.5,
          "attack_server_interval": 5,
          "round_duration_seconds": 99,
          "bonus_time_per_ally_seconds": 10,
          "maximum_attackers_per_battle": 20,
          "same_type_attack_bonus_multiplier": 1.25,
          "maximum_energy": 100,
          "energy_delta_per_health_lost": 0.5,
          "dodge_duration_ms": 500,
          "minimum_player_level": 5,
          "swap_duration_ms": 1000
        }),
        encounter_settings: new proto.Settings.Master.EncounterSettings({
          "spin_bonus_threshold": 0.5,
          "excellent_throw_threshold": 1.7000000476837158,
          "great_throw_threshold": 1.2999999523162842,
          "nice_throw_threshold": 1,
          "milestone_threshold": 100
        }),
        iap_settings: new proto.Settings.Master.IapSettings({
          "daily_bonus_coins": 0,
          "daily_defender_bonus_per_pokemon": [500, 10],
          "daily_defender_bonus_max_defenders": 10,
          "daily_defender_bonus_currency": ["STARDUST", "POKECOIN"],
          "min_time_between_claims_ms": 0,
          "daily_bonus_enabled": false,
          "daily_defender_bonus_enabled": true
        }),
        pokemon_upgrades: new proto.Settings.Master.PokemonUpgradeSettings({
          "upgrades_per_level": 2,
          "allowed_levels_above_player": 2,
          "candy_cost": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 6, 6, 8, 8, 10, 10, 12, 12, 15, 15],
          "stardust_cost": [200, 200, 400, 400, 600, 600, 800, 800, 1000, 1000, 1300, 1300, 1600, 1600, 1900, 1900, 2200, 2200, 2500, 2500, 3000, 3000, 3500, 3500, 4000, 4000, 4500, 4500, 5000, 5000, 6000, 6000, 7000, 7000, 8000, 8000, 9000, 9000, 10000, 10000]
        })
      }),
      timestamp_ms: 1468540960537
    }).encode()
  );

}