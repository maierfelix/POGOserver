import CFG from "../../cfg";

export default {
  GAME_SETTINGS: {
    fort_settings: {
      interaction_range_meters: 40.25098039215686,
      max_total_deployed_pokemon: 10,
      max_player_deployed_pokemon: 1,
      deploy_stamina_multiplier: 8.062745098039215,
      deploy_attack_multiplier: 0,
      far_interaction_range_meters: 1000.0156862745098
    },
    map_settings: {
      pokemon_visible_range: 70.00196078431372,
      poke_nav_range_meters: 751.0156862745098,
      encounter_range_meters: 50.25098039215686,
      get_map_objects_min_refresh_seconds: 16,
      get_map_objects_max_refresh_seconds: 16,
      get_map_objects_min_distance_meters: 10.007843017578125,
      google_maps_api_key: CFG.GMAPS_KEY
    },
    inventory_settings: {
      max_pokemon: 1000,
      max_bag_items: 1000,
      base_pokemon: 250,
      base_bag_items: 350,
      base_eggs: 9
    },
    minimum_client_version: CFG.MINIMUM_CLIENT_VERSION
  },
  PKMN_SETTINGS: {
    MIN_IV: 1,
    MAX_IV: 15,
    POWER_UP_PRICE: [
      {
        dust: 200,
        candy: 1,
        pkmnLevel: [1, 1.5, 2, 2.5]
      }, {
        dust: 400,
        candy: 1,
        pkmnLevel: [3, 3.5, 4, 4.5]
      }, {
        dust: 600,
        candy: 1,
        pkmnLevel: [5, 5.5, 6, 6.5]
      }, {
        dust: 800,
        candy: 1,
        pkmnLevel: [7, 7.5, 8, 8.5]
      }, {
        dust: 1000,
        candy: 1,
        pkmnLevel: [9, 9.5, 10, 10.5]
      }, {
        dust: 1300,
        candy: 2,
        pkmnLevel: [11, 11.5, 12, 12.5]
      }, {
        dust: 1600,
        candy: 2,
        pkmnLevel: [13, 13.5, 14, 14.5]
      }, {
        dust: 1900,
        candy: 2,
        pkmnLevel: [15, 15.5, 16, 16.5]
      }, {
        dust: 2200,
        candy: 2,
        pkmnLevel: [17, 17.5, 18, 18.5]
      }, {
        dust: 2500,
        candy: 2,
        pkmnLevel: [19, 19.5, 20, 20.5]
      }, {
        dust: 3000,
        candy: 3,
        pkmnLevel: [21, 21.5, 22, 22.5]
      }, {
        dust: 3500,
        candy: 3,
        pkmnLevel: [23, 23.5, 24, 24.5]
      }, {
        dust: 4000,
        candy: 3,
        pkmnLevel: [25, 25.5, 26, 26.5]
      }, {
        dust: 4500,
        candy: 3,
        pkmnLevel: [27, 27.5, 28, 28.5]
      }, {
        dust: 5000,
        candy: 3,
        pkmnLevel: [29, 29.5, 30, 30.5]
      }, {
        dust: 6000,
        candy: 4,
        pkmnLevel: [31, 31.5, 32, 32.5]
      }, {
        dust: 7000,
        candy: 4,
        pkmnLevel: [33, 33.5, 34, 34.5]
      }, {
        dust: 8000,
        candy: 4,
        pkmnLevel: [35, 35.5, 36, 36.5]
      }, {
        dust: 9000,
        candy: 4,
        pkmnLevel: [37, 37.5, 38, 38.5]
      }, {
        dust: 10000,
        candy: 4,
        pkmnLevel: [39, 39.5, 40, 40.5]
      }
    ]
  }
}