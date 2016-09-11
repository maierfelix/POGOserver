import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function NicknamePokemon(msg) {

  let buffer = null;
  let schema = "POGOProtos.Networking.Responses.NicknamePokemonResponse";

  let pkmn = this.party.getPkmnById(msg.pokemon_id);

  buffer = { result: null };

  if (pkmn) pkmn.setNickname(String(msg.nickname));
  buffer.result = pkmn ? "SUCCESS" : "ERROR_INVALID_NICKNAME";

  return (POGOProtos.serialize(buffer, schema));

}