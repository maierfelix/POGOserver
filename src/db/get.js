import CFG from "../../cfg";

/**
 * @param {String} column
 * @param {String} value
 * @param {String} table
 */
export function getQueryByColumnFromTable(column, value, table) {
  return new Promise((resolve) => {
    this.db.instance.query(`SELECT * FROM ${table} WHERE ${column}=?`, [value], (e, rows) => {
      if (e) console.log(e);
      if (rows && rows.length) resolve(rows);
      else resolve(void 0);
    });
  });
}

/**
 * @param {String} column
 * @param {String} value
 * @param {String} table
 */
export function deleteQueryByColumnFromTable(column, value, table) {
  return new Promise((resolve) => {
    this.db.instance.query(`DELETE FROM ${table} WHERE ${column}=?`, [value], (e, rows) => {
      if (e) console.log(e);
      else resolve(void 0);
    });
  });
}

/**
 * @param {String} column
 * @param {String} value
 */
export function getPkmnByColumn(column, value) {
  return new Promise((resolve) => {
    this.getQueryByColumnFromTable(column, value, CFG.MYSQL_OWNED_PKMN_TABLE).then((query) => {
      resolve(query || []);
    });
  });
}

/**
 * @param {String} column
 * @param {String} value
 */
export function getUserByColumn(column, value) {
  return new Promise((resolve) => {
    this.getQueryByColumnFromTable(column, value, CFG.MYSQL_USERS_TABLE).then((query) => {
      resolve(query);
    });
  });
}

/**
 * @param {String} email
 */
export function getUserByEmail(email) {
  return new Promise((resolve) => {
    this.getQueryByColumnFromTable("email", email, CFG.MYSQL_USERS_TABLE).then((query) => {
      resolve(query);
    });
  });
}
