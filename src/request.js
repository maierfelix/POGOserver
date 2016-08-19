import proto from "./proto";

import CFG from "../cfg";

import {
  ResponseEnvelope,
  AuthTicket
} from "./packets";

const REQUEST = proto.Networking.Requests.RequestType;

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

  let request = proto.Networking.Envelopes.RequestEnvelope.decode(req.body);

  if (!request.requests.length) {
    this.print("Received invalid request!", 31);
    return void 0;
  }

  if (CFG.DEBUG_LOG_REQUESTS) {
    console.log("#####");
    request.requests.map((request) => {
      console.log("Got request:", this.getRequestType(request));
    }).join(",");
  }

  if (!player.authenticated) {
    player.sendResponse(this.authenticatePlayer(player));
    return void 0;
  }

  this.processRequests(player, request.requests).then((answer) => {
    let msg = this.envelopResponse(1, request.request_id, answer, !!request.auth_ticket);
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
export function envelopResponse(status, id, response, auth) {

  let answer = ResponseEnvelope({
    id: id,
    status: status,
    response: response
  });

  if (auth) answer.auth_ticket = AuthTicket();

  return (answer);

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
 * @param {Request} req
 */
export function routeRequest(req) {

  let url = String(req.url);
  let route = url.substring(url.lastIndexOf("/") + 1);
  let host = req.headers.host;

  switch (route) {
    case "rpc":
      this.onRequest(req);
    break;
    default:
      console.log(`Unknown request url: https://${req.headers.host}${req.url}`);
    break;
  };

}

/**
 * @param  {Request} req
 * @return {Boolean}
 */
export function validRequest(req) {
  return (true);
}