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

import { decodeRequestEnvelope } from "./utils";

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
      return void 0;
    }
  }

  let request = proto.Networking.Envelopes.RequestEnvelope.decode(req.body);

  console.log("#####");
  request.requests.map((request) => {
    console.log("Got request:", this.getRequestType(request));
  }).join(",");

  if (!player.authenticated) {
    this.send(this.authenticatePlayer());
    return void 0;
  }

  this.processRequests(request.requests).then((answer) => {
    let msg = this.envelopResponse(1, request.request_id, answer, request.hasOwnProperty("auth_ticket"), request.unknown6);
    this.send(msg);
  });

}

/**
 * @param  {Number} status
 * @param  {Long} id
 * @param  {Array} response
 * @param  {Boolean} auth
 * @param  {Buffer} unknown6
 * @return {Buffer}
 */
export function envelopResponse(status, id, response, auth, unknown6) {

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
    let ii = 0;
    let length = requests.length;
    let body = [];
    for (; ii < length; ++ii) {
      this.processResponse(requests[ii]).then((request) => {
        body.push(request);
        if (ii + 1 >= length) resolve(body);
      });
    };
  });

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