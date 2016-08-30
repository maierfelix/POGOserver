import Cell from "./Cell";

import CFG from "../../../cfg";

import print from "../../print";

/**
 * @param {Array} cells
 * @param {Array} out
 * @param {Number} index
 */
export function getFortsByCells(cells, out, index) {
  return new Promise((resolve) => {
    this.getFortsByCellId(cells[index]).then((result) => {
      out.push(result);
      if (++index >= cells.length) resolve(out);
      else resolve(this.getFortsByCells(cells, out, index));
    });
  });
}

/**
 * @param {String} cellId
 */
export function getFortsByCellId(cellId) {
  return new Promise((resolve) => {
    if (!this.cellRegistered(cellId)) {
      this.registerCell(cellId).then((cell) => {
        resolve(cell);
      });
    }
    else {
      let cell = this.getCellById(cellId);
      cell.loadForts().then(() => {
        resolve(cell);
      });
    }
  });
}

/**
 * @param {String} cellId
 */
export function registerCell(cellId) {
  let cell = new Cell({
    world: this,
    cellId: cellId
  });
  this.cells[cellId] = cell;
  return new Promise((resolve) => {
    cell.loadForts().then(() => {
      resolve(this.getCellById(cellId));
    });
  });
}

/**
 * @param {Object} obj
 */
export function addFort(obj) {
  let cellId = Cell.getIdByPosition(obj.latitude, obj.longitude, obj.zoom);
  return new Promise((resolve) => {
    this.getFortsByCellId(cellId).then((cell) => {
      let fort = cell.addFort(obj);
      resolve(fort);
    });
  });
}

export function deleteFort(cellId, uid) {
  let cell = this.getCellById(cellId);
  let fort = cell.getFortById(uid);
  return new Promise((resolve) => {
    this.deleteFortFromDatabase(fort).then(() => {
      fort.delete();
      resolve();
    });
  });
}

export function insertFortIntoDatabase(obj) {
  return new Promise((resolve) => {
    this.addFort(obj).then((fort) => {
      let query = `INSERT INTO ${CFG.MYSQL_FORT_TABLE} SET cell_id=?, cell_uid=?, latitude=?, longitude=?, name=?, description=?, image_url=?, rewards=?`;
      let id = fort.parent.cellId;
      let lat = fort.latitude;
      let lng = fort.longitude;
      let name = fort.name;
      let desc = fort.description;
      let img = "http://thecatapi.com/api/images/get?format=src&type=png&d=" + +new Date();
      this.instance.db.query(query, [id, 0, lat, lng, name, desc, img, ""], (e, res) => {
        let insertId = res.insertId;
        this.instance.db.query(`SELECT * from ${CFG.MYSQL_FORT_TABLE} WHERE cell_id=? ORDER BY cell_uid DESC`, [id], (e, res) => {
          let index = res instanceof Array ? res[0].cell_uid + 1 : 0;
          this.instance.db.query(`UPDATE ${CFG.MYSQL_FORT_TABLE} SET cell_uid=? WHERE id=?`, [index, insertId], (e, res) => {
            fort.uid = index;
            resolve(fort);
          });
        });
      });
    });
  });
}

/**
 * @param {Fort} fort
 */
export function deleteFortFromDatabase(fort) {
  return new Promise((resolve) => {
    this.instance.db.query(`DELETE FROM ${CFG.MYSQL_FORT_TABLE} WHERE cell_id=? AND cell_uid=? LIMIT 1`, [fort.cellId, fort.uid], (e, res) => {
      resolve();
    });
  });
}