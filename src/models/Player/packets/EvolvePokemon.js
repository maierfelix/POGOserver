import POGOProtos from "pokemongo-protobuf";
import print from "../../../print";
import * as _calc from "../../Pokemon/calc";
/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function EvolvePokemon(msg) {


 let buffer = null;

  let pkmn = this.party.getPkmnById(msg.pokemon_id);
  if (pkmn) {
    if (pkmn.evolve()) {
      buffer = { result: "SUCCESS" };
    } else {
      buffer = { result: "FAILED_INSUFFICIENT_RESOURCES" };
    }
	pkmn.calcMoves();
	pkmn.cp = pkmn.calcCP(pkmn.owner);
    buffer.evolved_pokemon_data = pkmn.serialize();
	pkmn.updateDatabase();
	buffer.experience_awarded = 500;
	buffer.candy_awarded = 0;
  }
  else {
    buffer = { result: "FAILED_POKEMON_MISSING" };
  }

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.EvolvePokemonResponse")
  );

}