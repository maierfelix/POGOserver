import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function GetPlayerProfile(obj) {

  return (
    new proto.Networking.Responses.GetPlayerProfileResponse({
      result: proto.Networking.Responses.GetPlayerProfileResponse.Result.SUCCESS,
      start_time: new Date().getTime() * 1000,
      badges: [
        new proto.Data.PlayerBadge({
          badge_type: proto.Enums.BadgeType.BADGE_PIKACHU,
          rank: 1,
          start_value: 0,
          end_value: 2000,
          current_value: 1337
        })
      ]
    }).encode()
  );

}