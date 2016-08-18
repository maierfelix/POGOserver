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
          "badge_type": 1,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 1.0598372225667916
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 2,
          "rank": 1,
          "start_value": 5,
          "end_value": 50,
          "current_value": 5.031372549019608
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 3,
          "rank": 0,
          "start_value": 0,
          "end_value": 30,
          "current_value": 5.031372549019608
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 5,
          "rank": 0,
          "start_value": 0,
          "end_value": 3,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 6,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 8,
          "rank": 0,
          "start_value": 0,
          "end_value": 100,
          "current_value": 37.00098039215686
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 11,
          "rank": 0,
          "start_value": 0,
          "end_value": 3,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 13,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 14,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 18,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 8.062745098039215
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 19,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 20,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 8.062745098039215
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 21,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 1.007843137254902
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 22,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 23,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 24,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 8.062745098039215
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 25,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 26,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 27,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 28,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 29,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 30,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 31,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 32,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 33,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 34,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 35,
          "rank": 0,
          "start_value": 0,
          "end_value": 10,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 36,
          "rank": 0,
          "start_value": 0,
          "end_value": 3,
          "current_value": 0
        }),
        new proto.Data.PlayerBadge({
          "badge_type": 37,
          "rank": 0,
          "start_value": 0,
          "end_value": 3,
          "current_value": 0
        })
      ]
    }).encode()
  );

}
