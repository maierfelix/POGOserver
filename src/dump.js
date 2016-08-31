import fse from "fs-extra";
import POGOProtos from "pokemongo-protobuf";

import print from "./print";
import CFG from "../cfg";

import { _toCC } from "./utils";

/**
 * @param  {Request} req
 * @param  {Array} res
 * @return {Object}
 */
export function decode(req, res) {

  // clone
  req = JSON.parse(JSON.stringify(req));
  res = JSON.parse(JSON.stringify(res));

  // dont decode unknown6, since it bloats the file size
  delete req.unknown6;

  // decode requests
  for (let request of req.requests) {
    let key = _toCC(request.request_type);
    let msg = request.request_message;
    if (msg) {
      let proto = `POGOProtos.Networking.Requests.Messages.${key}Message`;
      request.request_message = this.parseProtobuf(new Buffer(msg.data), proto);
    }
  };

  // decode responses
  let index = 0;
  for (let resp of res) {
    let key = _toCC(req.requests[index].request_type);
    let msg = new Buffer(resp);
    let proto = `POGOProtos.Networking.Responses.${key}Response`;
    res[index] = this.parseProtobuf(msg, proto);
    index++;
  };

  // clone again to build response out of it
  let req2 = JSON.parse(JSON.stringify(req));

  // build res base out of req
  delete req2.requests;
  req2.returns = res;
  req2.status_code = 1;

  return ({
    req: req,
    res: res
  });

}

/**
 * @param  {Request} req
 * @param  {Response} res
 */
export function dumpTraffic(req, res) {
  try {
    let decoded = this.decode(req, res);
    let out = {
      Request: decoded.req,
      Response: decoded.res
    };
    decoded = JSON.stringify(out, null, 2);
    fse.outputFileSync(CFG.DEBUG_DUMP_PATH + Date.now(), decoded);
  } catch (e) {
    print("Dump traffic: " + e, 31);
  }
}