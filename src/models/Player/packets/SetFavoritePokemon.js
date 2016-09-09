import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function SetFavoritePokemon(msg) {

  let buffer = null;
  let pkmn = this.party.getPkmnById(msg.pokemon_id);
  
  if (pkmn) {
    pkmn.setFavorite(msg.is_favorite);
    buffer = { result: "SUCCESS" };
  }
  else {
    buffer = { result: "ERROR_POKEMON_NOT_FOUND" };
  }

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.SetFavoritePokemonResponse")
  );

}