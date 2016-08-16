import mysql from "mysql";

import * as CFG from "../../cfg";

export function setupConnection() {

  let connection = mysql.createConnection({
    host     : CFG.SERVER_MYSQL_HOST_IP,
    port     : CFG.SERVER_MYSQL_PORT,
    database : CFG.SERVER_MYSQL_DB_NAME,
    user     : CFG.SERVER_MYSQL_USERNAME,
    password : CFG.SERVER_MYSQL_PASSWORD
  });

  return new Promise((resolve) => {
    connection.connect((error) => {
      if (error) {
        this.print(error, 31);
        this.retry("Retrying again in ", () => this.setupConnection().then(resolve), 5);
        return void 0;
      }
      this.db.instance = connection;
      this.createTableIfNoExists().then(() => {
        resolve();
      });
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

export function createTableIfNoExists() {
  return new Promise((resolve) => {
    this.db.instance.query(`SHOW TABLES LIKE '${CFG.SERVER_MYSQL_TABLE}';`, (e, rows, fields) => {
      if (e) console.log(e);
      else {
        // exists
        if (rows && rows.length) resolve();
        // create user table
        else this.createTable(CFG.SERVER_MYSQL_TABLE).then(resolve);
      }
    });
  });
}

/**
 * @param {String} name
 */
export function createTable(name) {
  this.print(`Creating table ${CFG.SERVER_MYSQL_TABLE}`, 36);
  return new Promise((resolve) => {
    let query = `
      CREATE TABLE IF NOT EXISTS ${name} (
        id int(11) NOT NULL,
        username longtext NOT NULL,
        email longtext NOT NULL,
        exp int(255) NOT NULL,
        stardust int(255) NOT NULL,
        pokecoins int(255) NOT NULL,
        team int(11) NOT NULL,
        latitude double NOT NULL,
        longitude double NOT NULL,
        altitude int(255) NOT NULL,
        send_marketing_emails tinyint(1) NOT NULL,
        send_push_notifications tinyint(1) NOT NULL,
        skin int(11) NOT NULL,
        hair int(11) NOT NULL,
        shirt int(11) NOT NULL,
        pants int(11) NOT NULL,
        hat int(11) NOT NULL,
        shoes int(11) NOT NULL,
        eyes int(11) NOT NULL,
        gender int(11) NOT NULL,
        backpack int(11) NOT NULL
      ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
    `;
    this.db.instance.query(query, (e, rows, fields) => {
      if (e) console.log(e);
      else resolve();
    });
  });
}

/**
 * @param {String} email
 */
export function getUserByEmail(email) {
  return new Promise((resolve) => {
    this.db.instance.query(`SELECT * FROM ${CFG.SERVER_MYSQL_TABLE} WHERE email=? LIMIT 1`, [email], (e, rows, fields) => {
      if (e) console.log(e);
      else resolve(rows);
    });
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
export function updateUser(obj) {

  let query = this.getUserQuery("UPDATE", "WHERE email=? LIMIT 1");
  let data = this.getUserQueryData(obj);

  return new Promise((resolve) => {
    this.db.instance.query(query, data, resolve);
  });

}

/**
 * @return {String}
 */
export function getUserQuery(cmd, after) {
  return (`
    ${cmd} ${CFG.SERVER_MYSQL_TABLE}
    SET
      username=?,
      email=?,
      exp=?,
      stardust=?,
      pokecoins=?,
      team=?,
      latitude=?,
      longitude=?,
      altitude=?,
      send_marketing_emails=?,
      send_push_notifications=?,
      skin=?,
      hair=?,
      shirt=?,
      pants=?,
      hat=?,
      shoes=?,
      eyes=?,
      gender=?,
      backpack=?
    ${after}
  `);
}

/**
 * @param {Object} obj
 * @return {Array}
 */
export function getUserQueryData(obj) {

  return ([
    obj.username,
    obj.email,
    obj.exp,
    obj.stardust,
    obj.pokecoins,
    obj.team,
    // position
    obj.latitude,
    obj.longitude,
    obj.altitude,
    // contact settings
    obj.send_marketing_emails,
    obj.send_push_notifications,
    // avatar
    obj.skin,
    obj.hair,
    obj.shirt,
    obj.pants,
    obj.hat,
    obj.shoes,
    obj.eyes,
    obj.gender,
    obj.backpack,
    // where
    obj.email
  ]);

}