import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function UpgradePokemon(msg) {

  let buffer = null;
  let pkmn = this.party.getPkmnById(msg.pokemon_id);

  if (pkmn) {
    if (pkmn.powerUp()) {
      buffer = { result: "SUCCESS" };
    } else {
      buffer = { result: "ERROR_INSUFFICIENT_RESOURCES" };
    }
    buffer.upgraded_pokemon = pkmn.serialize();
  }
  else {
    buffer = { result: "ERROR_POKEMON_NOT_FOUND" };
  }

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.UpgradePokemonResponse")
  );

}