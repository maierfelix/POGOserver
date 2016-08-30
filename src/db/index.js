import mysql from "mysql";

import print from "../print";
import CFG from "../../cfg";

export function setupDatabaseConnection() {

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
        print("MySQL " + error, 31);
        this.retry("Retrying again in ", () => this.setupDatabaseConnection().then(resolve), 5);
        return void 0;
      }
      this.db = connection;
      this.createTableIfNotExists(CFG.MYSQL_USERS_TABLE).then(() => {
        this.createTableIfNotExists(CFG.MYSQL_OWNED_PKMN_TABLE).then(() => {
          print(`\x1b[36;1mMySQL\x1b[0m\x1b[32;1m connection established\x1b[0m`);
          resolve();
        });
      });
    });
    connection.on("error", (error) => {
      print("MySQL " + error, 31);
      this.retry("Trying to reconnect in ", () => this.setupDatabaseConnection().then(resolve), 5);
    });
  });

}

/**
 * @param {Function} resolve
 */
export function closeConnection(resolve) {
  this.db.end(() => {
    resolve();
  });
}