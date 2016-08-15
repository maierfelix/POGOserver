import proto from "../proto";

import { GetPlayer } from "./";

/**
 * @param {Request} req
 * @param {Player} player
 * @return {Object}
 */
export default function ClaimCodeName(req, player) {

  let data = proto.Networking.Requests.Messages.ClaimCodenameMessage.decode(req.request_message.toBuffer());

  player.username = data.codename;

  return (
    new proto.Networking.Responses.ClaimCodenameResponse({
      codename: data.codename,
      user_message: data.codename,
      is_assignable: true,
      status: 1
    }).encode()
  );

}