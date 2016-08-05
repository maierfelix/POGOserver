import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function GetHatchedEggs(obj) {

  return (
    new proto.Networking.Responses.GetHatchedEggsResponse({
      success: true,
      pokemon_id: [],
      experience_awarded: [],
      candy_awarded: [],
      stardust_awarded: []
    }).encode()
  );

}