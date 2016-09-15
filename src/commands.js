import print from "./print";
import CFG from "../cfg";

export function saveAllPlayers() {
	if (this.world.players.length > 0) {
	  for (let player of this.world.players) {
        this.savePlayer(player);
      };
	}
}

/**
 * @param {Player} player
 */
export function savePlayer(player) {
  return new Promise((resolve) => {
    if (player.authenticated) {
      this.updateUser(player).then(resolve);
    }
  });
}

/**
 * @param {Player} player
 */
export function updateUser(player) {
  let query = this.getUserQuery("UPDATE", "WHERE email=? LIMIT 1");
  let data = this.getUserQueryData(player);

  return new Promise((resolve) => {
    this.world.instance.db.query(query, data, (e, res) => {
      resolve();
    });
  });
}

/**
 * @param {Object} obj
 * @return {Array}
 */
export function getUserQueryData(obj) {
  return ([
    obj.username,
    obj.email,
    obj.info._exp,
    obj.info._level,
    obj.info.stardust,
    obj.info.pokecoins,
    obj.info._team,
    // position
    obj.latitude,
    obj.longitude,
    obj.altitude,
    // contact settings
    0, //obj.contact.sendMarketingEmails,
    0, //obj.contact.sendPushNotifications,
    // inventory
    '{}', //obj.candyBag,
    '{}', //obj.bag,
    '{}', //obj.avatar,
    '{"0":1,"1":1,"3":1,"4":1,"7":1}', //obj.tutorial,
    // WHERE
    obj.email
  ]);
}