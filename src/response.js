import POGOProtos from "pokemongo-protobuf";

import CFG from "../cfg";

import {
  _toCC,
  validUsername
} from "./utils";

/**
 * @param  {Request} req
 * @return {Buffer}
 */
export function parseMessage(req) {
  let proto = `POGOProtos.Networking.Requests.Messages.${cc}Message`;
  if (req.request_message) {
    try {
      return (this.parseProtobuf(req.request_message, proto));
    } catch (e) {
      this.print(`Failed to parse ${cc}: ${e}`, 31);
    }
  }
  return void 0;
}

/**
 * @param  {Player} player
 * @param  {Request} req
 * @return {Buffer}
 */
export function processResponse(player, req) {

  let buffer = null;

  let cc = _toCC(req.request_type);
  let msg = this.parseMessage(req);

  return new Promise((resolve) => {

    try {
      switch (req.request_type) {
        default:
          this.print(`Unknown request: ${req.request_type}`, 31);
        break;
      };
    } catch (e) {
      this.print(`Response error: ${e}`, 31);
    };

    resolve(buffer);

  });

}