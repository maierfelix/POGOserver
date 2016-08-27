import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 */
export default function GetPlayer(msg) {

  let buffer = {
    creation_timestamp_ms: new Date().getTime(),
    username: this.username,
    team: this.team,
    tutorial_state: this.tutorial.serialize(),
    avatar: this.avatar.serialize(),
    max_pokemon_storage: this.maxPkmnStorage,
    max_item_storage: this.maxItemStorage,
    daily_bonus: {
      next_defender_bonus_collect_timestamp_ms: +new Date()
    },
    contact_settings: this.contact.serialize(),
    currencies: this.currencies.serialize()
  }

  return (POGOProtos.serialize({ success: true, player_data: buffer }, "POGOProtos.Networking.Responses.GetPlayerResponse"));

}