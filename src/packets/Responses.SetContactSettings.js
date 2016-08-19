import CFG from "../../cfg";

import proto from "../proto";

import { GetPlayer } from "./";

/**
 * @param {Player} player
 * @return {Object}
 */
export default function SetContactSettings(player) {

  return (
    new proto.Networking.Responses.SetContactSettingsResponse({ 
      status: proto.Networking.Responses.SetContactSettingsResponse.Status.SUCCESS,
      player_data: GetPlayer(player).player_data
    }).encode()
  );

}