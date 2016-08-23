import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} obj
 * @return {Object}
 */
function getPlayerDataPacket(obj) {

  return (
    {
      creation_timestamp_ms: 1467936859925,
      username: obj.username,
      team: proto.Enums.TeamColor.YELLOW,
      tutorial_state: obj.tutorial_state,
      avatar: obj.avatar,
      max_pokemon_storage: 250,
      max_item_storage: 350,
      daily_bonus: {
        next_defender_bonus_collect_timestamp_ms: 1470174535972
      },
      contact_settings: obj.contact_settings,
      currencies: obj.currencies
    }
  );

}

/**
 * @param {Object} obj
 * @return {Object}
 */
function buildPlayerData(obj) {

  let team = obj.team;
  let username = obj.username;

  let pokecoins = obj.pokecoins;
  let stardust = obj.stardust;

  let avatar = {
    skin: obj.skin,
    hair: obj.hair,
    shirt: obj.shirt,
    pants: obj.pants,
    hat: obj.hat,
    shoes: obj.shoes,
    eyes: obj.eyes,
    gender: obj.gender,
    backpack: obj.backpack
  };

  let contact_settings = {
    send_marketing_emails: obj.send_marketing_emails,
    send_push_notifications: obj.send_push_notifications
  };

  let tutorial_state = [
    proto.Enums.TutorialState.LEGAL_SCREEN,
    proto.Enums.TutorialState.AVATAR_SELECTION,
    proto.Enums.TutorialState.POKEMON_CAPTURE,
    proto.Enums.TutorialState.NAME_SELECTION,
    proto.Enums.TutorialState.FIRST_TIME_EXPERIENCE_COMPLETE
  ];

  let currencies = [
    {
      name: "POKECOIN",
      amount: pokecoins
    },
    {
      name: "STARDUST",
      amount: stardust
    }
  ];

  return ({
    username: username,
    team: team,
    tutorial_state: tutorial_state,
    contact_settings: contact_settings,
    avatar: avatar,
    currencies: currencies
  });

}

export default function GetPlayer(obj) {

  let data = buildPlayerData(obj);

  let packet = getPlayerDataPacket(data);

  let buffer = {
    success: true,
    player_data: packet
  };

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetPlayerResponse"));

}