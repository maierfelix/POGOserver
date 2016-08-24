import CFG from "../../cfg";

import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function SetFavoritePokemon(player, req) {

  let buffer = {
    "result": "SUCCESS",
  };

  player.setFavoritePkmn(req.pokemon_id << 0, req.is_favorite);

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.SetFavoritePokemonResponse")
  );

}