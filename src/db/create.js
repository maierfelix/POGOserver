import fs from "fs";

import print from "../print";
import CFG from "../../cfg";

export function createTableIfNotExists(name) {
  return new Promise((resolve) => {
    this.db.query(`SHOW TABLES LIKE '${name}';`, (e, rows, fields) => {
      if (e) print(e, 31);
      else {
        // exists
        if (rows && rows.length) resolve();
        // create user table
        else this.createTables().then(resolve);
      }
    });
  });
}

/**
 * @param {String} name
 */
export function createTables() {
  return new Promise((resolve) => {
    this.createTable(CFG.MYSQL_GYM_TABLE).then(() => {
      this.createTable(CFG.MYSQL_USERS_TABLE).then(() => {
        this.createTable(CFG.MYSQL_SPAWN_TABLE).then(() => {
          this.createTable(CFG.MYSQL_POKESTOP_TABLE).then(() => {
            this.createTable(CFG.MYSQL_OWNED_PKMN_TABLE).then(() => {
              resolve();
            });
          });
        });
      });
    });
  });
}

export function createTable(name) {

  print(`Creating table ${name}`, 36);

  let query = `
    CREATE TABLE IF NOT EXISTS ${name} (
      ${fs.readFileSync(__dirname + "/tables/" + name + ".table", "utf8")}
    ) ENGINE=InnoDB;
  `;

  return new Promise((resolve) => {
    this.db.query(query, (e, rows) => {
      if (e) print(e, 31);
      else resolve();
    });
  });

}