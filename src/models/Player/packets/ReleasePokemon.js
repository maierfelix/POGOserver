import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function ReleasePokemon(msg) {

  let buffer = null;
  let pkmn = this.party.getPkmnById(msg.pokemon_id);

  if (pkmn) {
    this.party.deletePkmn(pkmn.uid);
    buffer = {
      result: "SUCCESS",
      candy_awarded: 0
    };
  } else {
    buffer = {
      result: "FAILED"
    };
  }

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.ReleasePokemonResponse")
  );

}