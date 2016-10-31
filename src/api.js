import fs from "fs";
import url from "url";
import s2 from "s2-geometry";

import Cell from "./models/World/Cell";

import print from "./print";
import CFG from "../cfg";

import {
  getHashCodeFrom
} from "./utils";

const S2Geo = s2.S2;

let showHint = true;

export function processApiCall(req, res, route) {

  let allowedHosts = CFG.API_ALLOWED_HOSTS;

  let hoster = url.parse(req.headers.referer).host;

  if (!(allowedHosts.indexOf(hoster) > -1)) {
    print(`Denied API access for ${hoster}!`, 31);
    if (showHint) {
      print(`To grant ${hoster} API access, add it to the allowed hosts in cfg.js`, 33);
      showHint = false;
    }
    let result = {
      success:false,
      reason: "API access denied!"
    };
    this.answerApiCall(res, JSON.stringify(result));
    return void 0;
  }

  let raw = req.body.toString();
  let json = null;

  try {
    json = JSON.parse(raw);
  } catch (e) {
    print(e, 31);
    this.answerApiCall(res, "");
    return void 0;
  }

  if (this.isApiCall(json)) {
    json.host = hoster;
    if (json.action === "login") {
      this["api_login"](json).then((result) => {
        this.answerApiCall(res, JSON.stringify(result));
      });
    }
    else {
      if (this.apiClients[hoster]) {
        this["api_" + json.action](json).then((result) => {
          this.answerApiCall(res, JSON.stringify(result));
        });
      }
      else {
        print(`${hoster} isnt logged in! Kicking..`, 31);
      }
    }
  }
  else {
    if (json.action === "init") {
      this.answerApiCall(res, JSON.stringify({ success: true }));
    }
  }

}

export function answerApiCall(res, data) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.end(data);
}

export function api_login(data) {

  if (typeof data !== "object") return void 0;

  let success = false;

  let username = CFG.API_USERNAME;
  let password = CFG.API_PASSWORD;

  if (
    username === data.username &&
    password === data.password
  ) {
    success = true;
    if (!this.apiClients[data.host]) {
      print(`API access for ${data.host} granted!`);
    }
    print(`${data.host} logged in!`, 36);
    this.apiClients[data.host] = {
      timestamp: +new Date()
    };
  }

  return new Promise((resolve) => {
    resolve({
      success: success
    });
  });

}

export function api_heartBeat() {
  return new Promise((resolve) => {
    resolve({
      timestamp: +new Date()
    });
  });
}

export function api_getConnectedPlayers() {
  return new Promise((resolve) => {
    resolve({
      connected_players: this.world.connectedPlayers
    });
  });
}

export function api_getServerVersion() {
  return new Promise((resolve) => {
    resolve({
      version: CFG.VERSION
    });
  });
}

export function api_spawnPkmnToPlayer(data) {
  let name = String(data.player);
  let pkmn = String(data.pkmn).toUpperCase();
  print(`Spawned 1x ${pkmn}'s to ${name}!`);
  return new Promise((resolve) => {
    resolve({
      success: true
    });
  });
}

export function api_addFortToPosition(data) {
  return new Promise((resolve) => {
    this.world.insertFortIntoDatabase(data).then((fort) => {
      resolve({
        success: true
      });
    });
  });
}

export function api_deleteFortById(data) {
  let uid = data.uid;
  let cellId = Cell.getIdByPosition(data.latitude, data.longitude, data.zoom);
  return new Promise((resolve) => {
    this.world.deleteFort(cellId, uid).then(() => {
      resolve({
        id: cellId + "." + uid,
        success: true
      });
    });
  });
}

export function api_getFortsByPosition(data) {
  return new Promise((resolve) => {
    let lat = data.latitude;
    let lng = data.longitude;
    let zoom = data.zoom;
    this.getNeighboredForts(this.getNeighbors(lat, lng, zoom), [], 0).then((forts) => {
      let result = [];
      forts.map((fort) => {
        let fortData = fort.serialize();
        fortData.name = fort.name;
        fortData.uid = fort.uid;
        result.push(fortData);
      });
      resolve({
        forts: result,
        success: true
      });
    });
  });
}

export function getNeighbors(lat, lng, lvl) {
  let origin = S2Geo.latLngToKey(lat, lng, lvl);
  let walk = [S2Geo.keyToId(origin)];
  let next = S2Geo.nextKey(origin);
  let prev = S2Geo.prevKey(origin);
  let ii = 0;
  let length = 10;
  for (; ii < length; ++ii) {
    walk.push(S2Geo.toId(prev));
    walk.push(S2Geo.toId(next));
    next = S2Geo.nextKey(next);
    prev = S2Geo.prevKey(prev);
  };
  walk.sort((a, b) => a - b);
  return (walk);
}

export function getNeighboredForts(cells, out, index) {
  return new Promise((resolve) => {
    let id = cells[index];
    this.world.getFortsByCellId(id).then((cell) => {
      out = out.concat(cell.forts);
      if (++index >= cells.length) resolve(out);
      else resolve(this.getNeighboredForts(cells, out, index));
    });
  });
}