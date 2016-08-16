import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
function getPlayerDataPacket(obj) {

  return (
    new proto.Data.PlayerData({
      creation_timestamp_ms: 1467936859925,
      username: obj.username,
      team: proto.Enums.TeamColor.YELLOW,
      tutorial_state: obj.tutorial_state,
      avatar: new proto.Data.Player.PlayerAvatar(obj.avatar),
      max_pokemon_storage: 250,
      max_item_storage: 350,
      daily_bonus: new proto.Data.Player.DailyBonus({
        next_defender_bonus_collect_timestamp_ms: 1470174535972
      }),
      contact_settings: new proto.Data.Player.ContactSettings(obj.contact_settings),
      currencies: obj.currencies
    })
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
    new proto.Data.Player.Currency({
      name: "POKECOIN",
      amount: pokecoins
    }),
    new proto.Data.Player.Currency({
      name: "STARDUST",
      amount: stardust
    })
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

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function GetPlayer(obj) {

  let data = buildPlayerData(obj);

  let packet = getPlayerDataPacket(data);

  return (
    new proto.Networking.Responses.GetPlayerResponse({
      success: true,
      player_data: packet
    })
  );

}