import CFG from "../../cfg";

import proto from "../proto";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function UpgradePokemon(req) {

  let data = proto.Networking.Requests.Messages.UpgradePokemonMessage.decode(req.request_message.toBuffer());

  return (
    new proto.Networking.Responses.UpgradePokemonResponse({
      result: proto.Networking.Responses.UpgradePokemonResponse.Result.ERROR_UPGRADE_NOT_AVAILABLE,
      upgraded_pokemon: null
    }).encode()
  );

}