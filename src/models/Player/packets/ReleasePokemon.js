import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function ReleasePokemon(msg) {

  let buffer = null;
  let schema = "POGOProtos.Networking.Responses.ReleasePokemonResponse";

  let pkmn = this.party.getPkmnById(msg.pokemon_id);

  return new Promise((resolve) => {
    if (pkmn) {
      this.releasePkmn(pkmn).then((result) => {
        buffer = {
          result: "SUCCESS",
          candy_awarded: 3
        };
        resolve(POGOProtos.serialize(buffer, schema));
      });
    } else {
      buffer = {
        result: "FAILED"
      };
      resolve(POGOProtos.serialize(buffer, schema));
    }
  });

}