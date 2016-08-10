import * as CFG from "../../cfg";

import proto from "../proto";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function EvolvePokemon(req) {

  let data = proto.Networking.Requests.Messages.EvolvePokemonMessage.decode(req.request_message.toBuffer());

  return (
    new proto.Networking.Responses.EvolvePokemonResponse({
      result: proto.Networking.Responses.EvolvePokemonResponse.Result.FAILED_POKEMON_CANNOT_EVOLVE,
      evolved_pokemon_data: null,
      experience_awarded: 0,
      candy_awarded: 0
    }).encode()
  );

}