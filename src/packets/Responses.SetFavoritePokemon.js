import CFG from "../../cfg";

import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function SetFavoritePokemon(req) {

  buffer = ({
    result: proto.Networking.Responses.SetFavoritePokemonResponse.Result.ERROR_POKEMON_NOT_FOUND
  });

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.SetFavoritePokemonResponse")
  );

}