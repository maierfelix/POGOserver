import Cell from "./Cell";

import CFG from "../../../cfg";

import print from "../../print";

/**
 * @param {String} id
 */
export function getFortDataById(id) {

  id = id.split(".") || [];

  let uid = id[1];
  let cellId = id[0];

  let cell = this.getCellById(cellId);

  return new Promise((resolve) => {
    if (!cellId || !uid || !cell) return resolve();
    cell.loadForts().then(() => {
      let fort = cell.getFortById(uid);
      resolve(fort);
    });
  });

}

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
    fort.delete();
    resolve();
  });
}

/**
 * @param {Object} obj
 */
export function insertFortIntoDatabase(obj) {
  return new Promise((resolve) => {
    let cellId = Cell.getIdByPosition(obj.latitude, obj.longitude, obj.zoom);
    let query = `INSERT INTO ${CFG.MYSQL_FORT_TABLE} SET cell_id=?, latitude=?, longitude=?, name=?, description=?, image_url=?, experience=?, rewards=?`;
    let lat = obj.latitude;
    let lng = obj.longitude;
    let name = obj.name;
    let desc = obj.description;
    let img = obj.image || "";
    let exp = obj.experience || 500;
    this.instance.db.query(query, [cellId, lat, lng, name, desc, img, exp, ""], (e, res) => {
      let insertId = res.insertId;
      obj.uid = insertId;
      obj.cell_id = cellId;
      this.addFort(obj).then((fort) => {
        resolve(fort);
      });
    });
  });
}