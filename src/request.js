import fs from "fs";
import url from "url";
import pcrypt from "pcrypt";
import POGOProtos from "pokemongo-protobuf";

import CFG from "../cfg";

/**
 * @param {Player} player
 * @param {Request} req
 * @param {Response} res
 */
export function routeRequest(player, req, res) {

  let parsed = url.parse(req.url).pathname;
  let route = parsed.split("/");
  let host = req.headers.host;

  switch (route[1]) {
    case "plfe":
    case "custom":
      if (route[2] === "rpc") this.onRequest(player, req);
    break;
    case "model":
      // make sure no random dudes can access download
      if (!player.authenticated) return void 0;
      let name = route[2];
      if (name && name.length > 1) {
        let folder = player.isAndroid ? "android/" : "ios/";
        fs.readFile("data/" + folder + name, (error, data) => {
          if (error) {
            this.print(`Error file resolving model ${name}:` + error, 31);
            return void 0;
          }
          this.print(`Sent ${name} to ${player.email}`, 36);
          res.end(data);
        });
      }
    break;
    default:
      console.log(`Unknown request url: https://${req.headers.host}${req.url}`);
    break;
  };

}

/**
 * @param {Player} player
 * @param {Request} req
 */
export function onRequest(player, req) {

  let request = this.parseProtobuf(req.body, "POGOProtos.Networking.Envelopes.RequestEnvelope");
      request.requests = request.requests || [];

  if (CFG.DEBUG_LOG_REQUESTS) {
    console.log("#####");
    request.requests.map((request) => {
      console.log("Got request:", request.request_type);
    }).join(",");
  }

  if (!player.authenticated) {
    player.sendResponse(this.authenticatePlayer(player));
    return void 0;
  }

  if (!request.requests.length) {
    this.print("Received invalid request!", 31);
    return void 0;
  }

  this.processRequests(player, request.requests).then((returns) => {
    if (CFG.DEBUG_DUMP_TRAFFIC) {
      this.dumpTraffic(request, returns);
    }
    let msg = this.envelopResponse(1, returns, request, player, !!request.auth_ticket);
    player.sendResponse(msg);
  });

}

/**
 * @param  {Number} status
 * @param  {Array} returns
 * @param  {Request} req
 * @param  {Player} player
 * @param  {Boolean} auth
 * @return {Buffer}
 */
export function envelopResponse(status, returns, req, player, auth) {

  let buffer = req;

  delete buffer.requests;

  buffer.returns = returns;

  // get players device platform one time
  if (player.hasSignature === false && buffer.unknown6 && buffer.unknown6.unknown2) {
    let sig = this.parseSignature(buffer);
    if (sig.device_info !== void 0) {
      player.isIOS = sig.device_info.device_brand === "Apple";
      player.isAndroid = !player.isIOS;
      player.hasSignature = true;
      player.asset_digest = this.assets[player.isAndroid ? "android" : "ios"];
      this.print(`${player.email} is playing with an ${player.isIOS ? "Apple" : "Android"} device!`, 36);
    }
  }

  if (auth) buffer.auth_ticket = AuthTicket();

  if (buffer.unknown6) {
    buffer.unknown6 = [{
      "response_type": 6,
      "unknown2": {
        "unknown1": "1",
        "items": [],
        "player_currencies": []
      }
    }];
  }

  buffer.status_code = status;

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Envelopes.ResponseEnvelope")
  );

}

/**
 * @param  {Player} player
 * @param  {Array} requests
 * @return {Array}
 */
export function processRequests(player, requests) {

  return new Promise((resolve) => {

    let index = 0;
    let length = requests.length;
    let body = [];

    const loop = (index) => {
      this.processResponse(player, requests[index]).then((request) => {
        body.push(request);
        if (++index >= length) resolve(body);
        else return loop(index);
      });
    };

    loop(0);

  });

}