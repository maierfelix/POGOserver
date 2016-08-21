import fs from "fs";
import url from "url";
import proto from "./proto";
import pcrypt from "pcrypt";
import POGOProtos from "pokemongo-protobuf";

import CFG from "../cfg";

import {
  ResponseEnvelope,
  AuthTicket
} from "./packets";

const REQUEST = proto.Networking.Requests.RequestType;

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
        fs.readFile("data/" + name, (error, data) => {
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
 * @param  {Request} req
 * @return {String}
 */
export function getRequestType(req) {

  for (let key in REQUEST) {
    if (REQUEST[key] === req.request_type) {
      return (key);
    }
  };

  return ("INVALID");

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
      this.print(`${player.email.replace("@gmail.com", "")}'s email isnt verified, kicking..`, 31);
      this.removePlayer(player);
      return void 0;
    }
  }

  let request = this.parseProtobuf(req.body, "POGOProtos.Networking.Envelopes.RequestEnvelope");

  if (!request.requests.length) {
    this.print("Received invalid request!", 31);
    return void 0;
  }

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

  this.processRequests(player, request.requests).then((answer) => {
    let msg = this.envelopResponse(1, request.request_id, answer, !!request.auth_ticket, request);
    if (CFG.DEBUG_DUMP_TRAFFIC) {
      this.dumpTraffic(req.body, msg);
    }
    player.sendResponse(msg);
  });

}

/**
 * @param  {Number} status
 * @param  {Long} id
 * @param  {Array} response
 * @param  {Boolean} auth
 * @return {Buffer}
 */
export function envelopResponse(status, id, response, auth, req) {

  let buffer = req;

  delete buffer.requests;

  buffer.returns = response;

  buffer.status_code = 1;

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