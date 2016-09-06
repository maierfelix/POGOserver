import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 */
export default function Encounter(msg) {

  let buffer = {};

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.EncounterResponse")
  );

}