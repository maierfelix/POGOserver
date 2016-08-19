import CFG from "../../cfg";

import proto from "../proto";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function NicknamePokemon(req) {

  let data = proto.Networking.Requests.Messages.NicknamePokemonMessage.decode(req.request_message.toBuffer());

  // TODO: Save nickname into db

  return (
    new proto.Networking.Responses.NicknamePokemonResponse({
      result: proto.Networking.Responses.NicknamePokemonResponse.Result.ERROR_INVALID_NICKNAME
    }).encode()
  );

}