import fs from "fs";
import url from "url";
import proto from "./proto";
import pcrypt from "pcrypt";
import POGOProtos from "pokemongo-protobuf";

import CFG from "../cfg";

import {
  ResponseEnvelope,
  AuthTicket,
  ShopData
} from "./packets";

/**
 * @param {Request} req
 * @param {Response} res
 */
export function routeRequest(req, res) {

  let player = this.getPlayerByRequest(req);

  let parsed = url.parse(req.url).pathname;
  let route = parsed.split("/");
  let host = req.headers.host;

  switch (route[1]) {
    case "plfe":
    case "custom":
      if (route[2] === "rpc") this.onRequest(req);
    break;
    case "model":
      // make sure no random dudes can access download
      if (!player.authenticated || !player.email_verified) return void 0;
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
    case "om":
      if (
        route[2] === "glm" &&
        route[3] === "mmap"
      ) {
        this.print(`Received gmaps request!`, 33);
      }
    break;
    default:
      console.log(`Unknown request url: https://${req.headers.host}${req.url}`);
    break;
  };

}

export function parseProtobuf(buffer, path) {
  try {
    return POGOProtos.parseWithUnknown(buffer, path);
  } catch (e) {
    this.print(e, 31);
  }
}

/**
 * @param {Request} req
 */
export function parseSignature(req) {
  let key = pcrypt.decrypt(req.unknown6.unknown2.encrypted_signature);
  return (
    POGOProtos.parseWithUnknown(key, "POGOProtos.Networking.Envelopes.Signature")
  );
}

/**
 * @param {Request} req
 */
export function onRequest(req) {

  let player = this.getPlayerByRequest(req);

  // Validate email verification
  if (player.authenticated) {
    if (!player.email_verified) {
      this.print(`${player.email}'s email isnt verified, kicking..`, 31);
      this.removePlayer(player);
      return void 0;
    }
  }

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
    // send shop data
    if (request.unknown6 && request.unknown6.request_type === 6) {
      let msg = this.envelopResponse(1, [], request, !!request.auth_ticket, true);
      player.sendResponse(msg);
    }
    // otherwise invalid
    else {
      this.print("Received invalid request!", 31);
      return void 0;
    }
  }

  this.processRequests(player, request.requests).then((returns) => {
    if (CFG.DEBUG_DUMP_TRAFFIC) {
      this.dumpTraffic(request, returns);
    }
    let msg = this.envelopResponse(1, returns, request, player, !!request.auth_ticket, false);
    player.sendResponse(msg);
  });

}

/**
 * @param  {Number} status
 * @param  {Array} returns
 * @param  {Request} req
 * @param  {Player} player
 * @param  {Boolean} auth
 * @param  {Boolean} shop
 * @return {Buffer}
 */
export function envelopResponse(status, returns, req, player, auth, shop) {

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
  if (shop) buffer.unknown6 = [ShopData()];

  if (buffer.unknown6 && !shop) {
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

    let loop = (index) => {
      this.processResponse(player, requests[index]).then((request) => {
        body.push(request);
        if (++index >= length) resolve(body);
        else return loop(index);
      });
    };

    loop(0);

  });

}

/**
 * @param  {Request} req
 * @return {Boolean}
 */
export function validRequest(req) {
  return (true);
}