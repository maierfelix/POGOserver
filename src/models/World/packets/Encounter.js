import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 */
export default function Encounter(msg) {

  let player = msg.player;

  // Try to use cached encounter
  let encounter = player.currentEncounter;

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
    player.currentEncounter = null;
    buffer.status = "ENCOUNTER_NOT_FOUND";
  }
  // Already encountered
  else if (encounter.alreadyCatchedBy(player)) {
    buffer.status = "ENCOUNTER_ALREADY_HAPPENED";
  }
  // Encounter success
  else {
    player.currentEncounter = encounter;
    encounter.seenBy(player);
    buffer.wild_pokemon = encounter.serializeWild();
    buffer.wild_pokemon.pokemon_data.cp = encounter.getSeenCp(player);
  }

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.EncounterResponse")
  );

}