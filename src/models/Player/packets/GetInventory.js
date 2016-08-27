import POGOProtos from "pokemongo-protobuf";

export default function GetInventory() {

  let stats = this.GetInventoryPlayer();
  let items = this.GetInventoryItems();
  let party = this.GetInventoryParty();

  let buffer = ({
    success: true,
    inventory_delta: {
      new_timestamp_ms: new Date().getTime(),
      inventory_items: stats.concat(items).concat(party)
    }
  });

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetInventoryResponse"));

}

export function GetInventoryPlayer() {

  let player = this.player;

  return ({
    modified_timestamp_ms: new Date().getTime(),
    inventory_item_data: {
      player_stats: {
        level: player.level,
        experience: player.exp,
        prev_level_xp: "21000",
        next_level_xp: "36000",
        km_walked: 3.921541213989258,
        pokemons_encountered: 75,
        unique_pokedex_entries: 25,
        pokemons_captured: 71,
        poke_stop_visits: 123,
        pokeballs_thrown: 74,
        eggs_hatched: 1,
        big_magikarp_caught: 1,
        pokemon_deployed: 1
      }
    }
  });

}

export function GetInventoryItems() {

  let player = this.player;

  let items = [];
  let match = "item_";

  for (let key in player) {
    if (key.substring(0, 5) === match) {
      items.push({
        modified_timestamp_ms: new Date().getTime(),
        inventory_item_data: {
          item: {
            item_id: key.toUpperCase(),
            count: parseFloat(player[key])
          }
        }
      });
    }
  };

  return (items);

}

export function GetInventoryParty() {

  let player = this.player;
  let pkmns = [];

  for (let pkmn of player.party) {
    pkmns.push({
      inventory_item_data: {
        pokemon_data: {
          id: pkmn.id,
          pokemon_id: pkmn.pokemon_id,
          cp: pkmn.cp,
          stamina: pkmn.stamina,
          stamina_max: pkmn.stamina_max,
          move_1: pkmn.move_1,
          move_2: pkmn.move_2,
          height_m: pkmn.height_m,
          weight_kg: pkmn.weight_kg,
          individual_attack: pkmn.individual_attack,
          individual_defense: pkmn.individual_defense,
          individual_stamina: pkmn.individual_stamina,
          cp_multiplier: pkmn.cp_multiplier,
          pokeball: pkmn.pokeball,
          captured_cell_id: pkmn.captured_cell_id,
          creation_time_ms: pkmn.creation_time_ms
        }
      }
    });
  };

  return (pkmns);

}