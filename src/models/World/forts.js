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
    if (!this.cellAlreadyRegistered(cellId)) {
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
  this.cells.push(cell);
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
    if (obj.type === "CHECKPOINT") {
      this.insertPokestopIntoDatabase(obj).then((gym) => {
        resolve(gym);
      });
    }
    else if (obj.type === "GYM") {
      this.insertGymIntoDatabase(obj).then((pokestop) => {
        resolve(pokestop);
      });
    }
    else if (obj.type === "SPAWN") {
      this.insertSpawnIntoDatabase(obj).then((spawn) => {
        resolve(spawn);
      });
    }
  });
}

export function insertPokestopIntoDatabase(obj) {
  let cellId = Cell.getIdByPosition(obj.latitude, obj.longitude, obj.zoom);
  let lat = obj.latitude;
  let lng = obj.longitude;
  let name = obj.name;
  let desc = obj.description;
  let img = obj.imageUrl || "";
  let exp = obj.experience || 500;
  let query = `INSERT INTO ${Cell.getFortTable(obj.type)} SET cell_id=?, latitude=?, longitude=?, name=?, description=?, image_url=?, experience=?, rewards=?`;
  return new Promise((resolve) => {
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

export function insertGymIntoDatabase(obj) {
  let cellId = Cell.getIdByPosition(obj.latitude, obj.longitude, obj.zoom);
  let lat = obj.latitude;
  let lng = obj.longitude;
  let query = `INSERT INTO ${Cell.getFortTable(obj.type)} SET cell_id=?, latitude=?, longitude=?, team=?, in_battle=?, points=?`;
  return new Promise((resolve) => {
    this.instance.db.query(query, [cellId, lat, lng, 0, 0, 0], (e, res) => {
      let insertId = res.insertId;
      obj.uid = insertId;
      obj.cell_id = cellId;
      this.addFort(obj).then((fort) => {
        resolve(fort);
      });
    });
  });
}

export function insertSpawnIntoDatabase(obj) {
  let cellId = Cell.getIdByPosition(obj.latitude, obj.longitude, obj.zoom);
  let lat = obj.latitude;
  let lng = obj.longitude;
  let encounters = [];
  obj.encounters.split(",").map((encounter) => {
    encounters.push(encounter << 0);
  });
  let query = `INSERT INTO ${Cell.getFortTable(obj.type)} SET cell_id=?, latitude=?, longitude=?, encounters=?, update_interval=?`;
  return new Promise((resolve) => {
    this.instance.db.query(query, [cellId, lat, lng, `[${encounters}]`, obj.interval << 0], (e, res) => {
      obj.uid = res.insertId;
      obj.cell_id = cellId;
      this.addFort(obj).then((fort) => {
        resolve(fort);
      });
    });
  });
}
