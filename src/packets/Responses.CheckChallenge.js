import CFG from "../../cfg";

import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Request} req
 * @return {Object}
 */
export default function CheckChallenge(req) {

  let buffer = ({
    challenge_url: " "
  });

  return POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.CheckChallengeResponse");

}