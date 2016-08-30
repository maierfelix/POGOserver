import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 */
export default function CheckChallenge(msg) {

  let buffer = {
    challenge_url: " "
  };

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.CheckChallengeResponse")
  );

}