import fs from "fs";
import proto from "./proto";

import * as CFG from "../cfg";
import { REQUEST } from "./requests";

import {
  ResponseEnvelope,
  ResponseEnvelopeAuth,
  AuthTicket,
  GetInventory
} from "./packets";

import {
  decodeLong,
  decodeRequestEnvelope
} from "./utils";

import jwtDecode from "jwt-decode";

/**
 * @return {Buffer}
 */
export function authenticatePlayer() {

  let player = this.player;

  let request = decodeRequestEnvelope(this.getRequestBody());

  let msg = ResponseEnvelopeAuth({
    id: request.request_id
  });

  let token = request.auth_info;

  if (token.provider === "google") {
    if (token.token !== null) {
      let decoded = jwtDecode(token.token.contents);
      player.generateUid(decoded.email);
      player.email = decoded.email;
      player.email_verified = decoded.email_verified;
      this.print(`${player.email.replace("@gmail.com", "")} connected!`, 36);
    }
    else {
      this.print("Invalid authentication token! Kicking..", 31);
      this.removePlayer(player);
      return void 0;
    }
  }

  player.authenticated = true;

  return (msg);

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

/**
 * @param {Request} req
 * @param {Response} res
 */
export function onRequest(req, res) {

  this.player = this.getPlayerByRequest(req);
  this.player.response = res;

  let player = this.player;

  // Validate email verification
  if (player.authenticated) {
    if (!player.email_verified) {
      this.print(`${player.email.replace("@gmail.com", "")}'s email isnt verified, kicking..`, 31);
      this.removePlayer(player);
      return void 0;
    }
  }

  let request = proto.Networking.Envelopes.RequestEnvelope.decode(req.body);

  if (CFG.SERVER_LOG_REQUESTS) {
    console.log("#####");
    request.requests.map((request) => {
      console.log("Got request:", this.getRequestType(request));
    }).join(",");
  }

  if (!player.authenticated) {
    this.send(this.authenticatePlayer());
    return void 0;
  }

  this.processRequests(request.requests).then((answer) => {
    let msg = this.envelopResponse(1, request.request_id, answer, request.hasOwnProperty("auth_ticket"));
    this.send(msg);
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
 * @param  {Array} requests
 * @return {Array}
 */
export function processRequests(requests) {

  return new Promise((resolve) => {

    let index = 0;
    let length = requests.length;
    let body = [];

    let loop = (index) => {
      this.processResponse(requests[index]).then((request) => {
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
 * @param {Response} res
 */
export function routeRequest(req, res) {

  let url = String(req.url);
  let route = url.substring(url.lastIndexOf("/") + 1);
  let host = req.headers.host;

  switch (route) {
    case "rpc":
      this.onRequest(req, res);
    break;
    case "oauth":
      let out = null;
      let buffer = req.body.toString();
      let signature = "321187995bc7cdc2b5fc91b11a96e2baa8602c62";
      if (/Email.*com.nianticlabs.pokemongo/.test(buffer)) {
        out = new Buffer(buffer.replace(/&client_sig=[^&]*&/, "&client_sig=" + signature + "&"));
      }
      console.log("OAUTH", out);
      if (out instanceof Buffer) this.send(out);
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

/**
 * @return {Buffer}
 */
export function getRequestBody() {
  return (
    this.request.body
  );
}

/**
 * @param {Buffer} buffer
 */
export function send(buffer) {

  this.player.response.end(buffer);

}