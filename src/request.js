import proto from "./proto";

import * as CFG from "../cfg";
import { REQUEST } from "../requests";

import { ResponseEnvelope, AuthTicket, GetPlayer } from "./packets";

/**
 * @param {Buffer} body
 */
export function decodeRequestBody(body) {
  return (
    proto.Networking.Envelopes.RequestEnvelope.decode(body)
  );
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export function onRequest(req, res) {

  let request = this.decodeRequestBody(req.body);

  console.log("Got request");
  console.log("Received:", request.requests.map((request) => {
    return request.request_type;
  }).join(","));

  let answer = this.processRequests(request);

  //res.send(answer);

}

/**
 * @param {Request} req
 * @return {Array}
 */
export function processRequests(req) {

  let ii = 0;
  let length = req.requests.length;

  let body = [];

  for (; ii < length; ++ii) {
    body.push(this.processRequest(req.requests[ii]));
  };

  return (body);

}

export function decodeBuffer(buffer) {

  let auth = proto.Networking.Envelopes.RequestEnvelope.decode(buffer);

  //console.log(auth);

}

/**
 * @param {Request} req
 * @return {Object}
 */
export function processRequest(req) {

  switch (req.request_type) {
    // #LOGIN START
    case REQUEST.GET_PLAYER:
      this.decodeBuffer(req.request_message.buffer);
      return (
        GetPlayer({
          username: "Felix",
          team: 2,
          pokecoins: 500,
          stardust: 32500
        })
      );
    break;
    case REQUEST.GET_HATCHED_EGGS:

    break;
    case REQUEST.GET_INVENTORY:

    break;
    case REQUEST.CHECK_AWARDED_BADGES:

    break;
    case REQUEST.DOWNLOAD_SETTINGS:

    break;
    case REQUEST.DOWNLOAD_ITEM_TEMPLATES:
      
    break;
    // #LOGIN END
    case REQUEST.GET_PLAYER_PROFILE:
      
    break;
    case REQUEST.GET_MAP_OBJECTS:

    break;
    case REQUEST.GET_GYM_DETAILS:

    break;
  };

}

/**
 * @param {Request} req
 * @return {Boolean}
 */
export function validRequest(req) {
  return (true);
}