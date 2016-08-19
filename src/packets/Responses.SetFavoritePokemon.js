import CFG from "../../cfg";

import proto from "../proto";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function SetFavoritePokemon(req) {

  let data = proto.Networking.Requests.Messages.SetFavoritePokemonMessage.decode(req.request_message.toBuffer());
console.log(data);
  // TODO: save into db

  return (
    new proto.Networking.Responses.SetFavoritePokemonResponse({
      result: proto.Networking.Responses.SetFavoritePokemonResponse.Result.ERROR_POKEMON_NOT_FOUND
    }).encode()
  );

}