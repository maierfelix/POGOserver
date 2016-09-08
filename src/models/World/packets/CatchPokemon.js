import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 */
export default function CatchPokemon(msg) {

  let buffer = null;

  let player = msg.player;
  let bag = player.bag;
  let item = bag.getLocalItemKey(msg.pokeball);

  let pkmn = msg.player.currentEncounter;

  player.bag[item] -= 1;

  // Invalid pkmn
  if (!pkmn) {
    buffer = {
      status: "CATCH_ERROR"
    };
  // Missed
  } else if (!msg.hit_pokemon || !bag[item]) {
    buffer = {
      status: "CATCH_MISSED"
    };
  // Escaped
  } else if (Math.random() < .35) {
    buffer = {
      status: "CATCH_ESCAPE"
    };
  // Catched
  } else {
    player.catchPkmn(pkmn);
    buffer = {
      status: "CATCH_SUCCESS",
      captured_pokemon_id: pkmn.encounterId,
      capture_award: {
        activity_type: ["ACTIVITY_CATCH_POKEMON"],
        xp: [100],
        candy: [3],
        stardust: [100]
      }
    };
  }

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.CatchPokemonResponse")
  );

}