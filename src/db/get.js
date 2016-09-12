import print from "../print";
import CFG from "../../cfg";

/**
 * @param {String} column
 * @param {String} value
 * @param {String} table
 */
export function getQueryByColumnFromTable(column, value, table) {
  return new Promise((resolve) => {
    this.db.query(`SELECT * FROM ${table} WHERE ${column}=?`, [value], (e, rows) => {
      if (e) print(e, 31);
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
    this.db.query(`DELETE FROM ${table} WHERE ${column}=?`, [value], (e, rows) => {
      if (e) print(e, 31);
      else resolve(void 0);
    });
  });
}