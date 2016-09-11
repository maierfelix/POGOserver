import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 */
export default function Encounter(msg) {

  // Try to use cached encounter
  let encounter = msg.player.currentEncounter;

  // Dont use cached encounter
  if (
    encounter === null ||
    encounter.uid !== parseInt(msg.encounter_id)
  ) {
    encounter = this.getEncounterById(msg.encounter_id);
  }

  let buffer = {
    status: "ENCOUNTER_SUCCESS",
    capture_probability: {
      pokeball_type: ["ITEM_POKE_BALL", "ITEM_GREAT_BALL", "ITEM_ULTRA_BALL"],
      capture_probability: [1, 1, 1]
    }
  };

  // Invalid pkmn
  if (!encounter) {
    msg.player.currentEncounter = null;
    buffer.status = "ENCOUNTER_NOT_FOUND";
  }
  // Already encountered
  else if (encounter.alreadyCatchedBy(msg.player)) {
    buffer.status = "ENCOUNTER_ALREADY_HAPPENED";
  }
  // Encounter success
  else {
    msg.player.currentEncounter = encounter;
    buffer.wild_pokemon = encounter.serializeWild();
  }

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.EncounterResponse")
  );

}