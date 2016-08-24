import fs from "fs";
import mysql from "mysql";

import CFG from "../../cfg";

export function setupConnection() {

  let connection = mysql.createConnection({
    host     : CFG.MYSQL_HOST_IP,
    port     : CFG.MYSQL_PORT,
    database : CFG.MYSQL_DB_NAME,
    user     : CFG.MYSQL_USERNAME,
    password : CFG.MYSQL_PASSWORD
  });

  return new Promise((resolve) => {
    connection.connect((error) => {
      if (error) {
        this.print("MySQL " + error, 31);
        this.retry("Retrying again in ", () => this.setupConnection().then(resolve), 5);
        return void 0;
      }
      this.db.instance = connection;
      this.createTableIfNoExists(CFG.MYSQL_USERS_TABLE).then(() => {
        this.createTableIfNoExists(CFG.MYSQL_OWNED_PKMN_TABLE).then(() => {
          this.print(`\x1b[36;1mMySQL\x1b[0m\x1b[32;1m connection established\x1b[0m`);
          resolve();
        });
      });
    });
    connection.on("error", (error) => {
      this.print("MySQL " + error, 31);
      this.retry("Trying to reconnect in ", () => this.setupConnection().then(resolve), 5);
    });
  });

}

/**
 * @param {Function} resolve
 */
export function closeConnection(resolve) {
  this.db.instance.end(() => {
    resolve();
  });
}

/**
 * @param {Object} obj
 */
export function createUser(obj) {

  let query = this.getUserQuery("INSERT INTO", "");
  let data = this.getUserQueryData(obj);

  return new Promise((resolve) => {
    this.db.instance.query(query, data, resolve);
  });

}

/**
 * @param {Object} obj
 */
export function createOwnedPokemon(obj) {

  let query = this.getOwnedPkmnQuery("INSERT INTO", "");
  let data = this.getOwnedPkmnQueryData(obj);

  return new Promise((resolve) => {
    this.db.instance.query(query, data, resolve);
  });

}

/**
 * @param {Object} obj
 */
export function deleteOwnedPokemon(id) {

  return new Promise((resolve) => {
    this.deleteQueryByColumnFromTable("id", id, CFG.MYSQL_OWNED_PKMN_TABLE).then(() => {
      resolve();
    });
  });

}

/**
 * @param {Player} player
 */
export function updateUser(player) {

  let query = this.getUserQuery("UPDATE", "WHERE email=? LIMIT 1");
  let data = this.getUserQueryData(player);

  return new Promise((resolve) => {
    this.db.instance.query(query, data, resolve);
  });

}

/**
 * @param {Player} player
 */
export function updateUserItems(player) {

  let query = this.getUserItemQuery("UPDATE", "WHERE email=? LIMIT 1");
  let data = this.getUserItemQueryData(player);

  return new Promise((resolve) => {
    this.db.instance.query(query, data, resolve);
  });

}

/**
 * @param {Player} player
 */
export function updateUserParty(player) {

  let pkmn = null;
  let data = null;
  let query = this.getOwnedPkmnQuery("UPDATE", "WHERE id=? AND owner_id=? LIMIT 1");

  return new Promise((resolve) => {
    let ii = 0;
    let index = 0;
    let length = player.party.length;
    for (; ii < length; ++ii) {
      pkmn = player.party[ii];
      data = this.getOwnedPkmnQueryData(pkmn);
      data.push(pkmn.id, player.owner_id);
      this.db.instance.query(query, data, () => {
        if (++index >= length) resolve();
      });
    };
  });

}