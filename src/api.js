import fs from "fs";
import url from "url";
import prompt from "prompt";

import CFG from "../cfg";

prompt.start({
  message: " ",
  delimiter: " "
});

export function processApiCall(req, res, route) {

  let save = JSON.parse(fs.readFileSync(".save", "utf8"));
  let allowedHosts = save.allowedApiHosts;

  let hoster = url.parse(req.headers.referer).host;

  if (!(allowedHosts.indexOf(hoster) > -1)) {
    this.grantApiAccess(req, res, route);
    return void 0;
  }

  let raw = req.body.toString();
  let json = null;

  try {
    json = JSON.parse(raw);
  } catch (e) {
    this.print(e, 31);
    this.answerApiCall(res, "");
    return void 0;
  }

  if (this.isApiCall(json)) {
    json.host = hoster;
    if (json.action === "login") {
      let result = this["api_login"](json);
      this.answerApiCall(res, JSON.stringify(result));
    }
    else {
      if (this.apiClients[hoster]) {
        let result = this["api_" + json.action](json);
        this.answerApiCall(res, JSON.stringify(result));
      }
      else {
        this.print(`${hoster} isnt logged in! Kicking..`, 31);
      }
    }
  }
  else {
    if (json.action === "init") {
      this.answerApiCall(res, JSON.stringify({ success: true }));
    }
  }

}

export function grantApiAccess(req, res, route) {

  let save = JSON.parse(fs.readFileSync(".save", "utf8"));

  let hoster = url.parse(req.headers.referer).host;

  let msg = `[Console] \x1b[33mGrant API access to ${hoster}?\x1b[0m`;

  prompt.get([{ name: "grant", required: true, description: msg }], (e, result) => {
    if (result.grant === "y" || result.grant === "yes") {
      save.allowedApiHosts.push(hoster);
      fs.writeFileSync(".save", JSON.stringify(save), "utf8");
      this.print(`Successfully added ${hoster} to allowed API hosts!`);
      this.processApiCall(req, res, route);
    }
    else {
      this.print(`Denied API access for ${hoster}`, 31);
      this.answerApiCall(res, "");
    }
  });

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

  let save = JSON.parse(fs.readFileSync(".save", "utf8"));

  let success = false;

  let username = save.loginDetails.username;
  let password = save.loginDetails.password;

  if (
    username === data.username &&
    password === data.password
  ) {
    success = true;
    if (!this.apiClients[data.host]) {
      this.print(`API access for ${data.host} granted!`);
    }
    this.print(`${data.host} logged in!`, 36);
    this.apiClients[data.host] = {
      timestamp: +new Date()
    };
  }
  return ({
    success: success
  });
}

export function api_getConnectedPlayers() {
  return ({
    connected_players: this.world.players.length
  });
}

export function api_getServerVersion() {
  return ({
    version: CFG.VERSION
  });
}

export function api_spawnPkmnToPlayer(data) {
  let name = String(data.player);
  let pkmn = String(data.pkmn).toUpperCase();
  this.print(`Spawned 1x ${pkmn}'s to ${name}!`);
  return ({
    success: true
  });
}