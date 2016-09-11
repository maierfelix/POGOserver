import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 */
export default function CatchPokemon(msg) {

  let buffer = null;
  let schema = "POGOProtos.Networking.Responses.CatchPokemonResponse";

  let player = msg.player;
  let bag = player.bag;
  let ball = bag.getLocalItemKey(msg.pokeball);

  let pkmn = msg.player.currentEncounter;

  player.bag[ball] -= 1;

  return new Promise((resolve) => {
    // Invalid pkmn
    if (!pkmn) {
      player.currentEncounter = null;
      pkmn.caughtBy(player);
      buffer = {
        status: "CATCH_ERROR"
      };
    // Missed
    } else if (!msg.hit_pokemon || !bag[ball]) {
      buffer = {
        status: "CATCH_MISSED"
      };
    } else {
      // Fleed
      if (Math.random() < .1) {
        pkmn.caughtBy(player);
        player.currentEncounter = null;
        buffer = {
          status: "CATCH_FLEE"
        };
      // Escaped
      } else if (Math.random() < .2) {
        buffer = {
          status: "CATCH_ESCAPE"
        };
      // Catched?
      } else {
        player.catchPkmn(pkmn, msg.pokeball).then((result) => {
          resolve(POGOProtos.serialize(result, schema));
        });
        return void 0;
      }
    }
    resolve(POGOProtos.serialize(buffer, schema));
  });

}