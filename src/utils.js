import Long from "long";
import proto from "./proto";
import { DownloadUrls } from "./res";

import * as CFG from "../cfg";

/**
 * @param {Object} cls
 * @param {Object} prot
 * @export
 */
export function inherit(cls, prot) {

  let key = null;

  for (key in prot) {
    if (prot[key] instanceof Function) {
      cls.prototype[key] = prot[key];
    }
  };

}

/**
 * @param {Buffer} body
 */
export function decodeRequestEnvelope(body) {
  return (
    proto.Networking.Envelopes.RequestEnvelope.decode(body)
  );
}

/**
 * http://stackoverflow.com/a/7616484/3367904
 * @param {String} str
 * @return {String}
 */
export function getHashCodeFrom(str) {
  var hash = 0, i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/**
 * @param {Long} long
 * @return {Number}
 */
export function decodeLong(long) {

  let value = Long.fromBits(long.high, long.low, !!long.unsigned);

  return (parseInt(value.toString()));

}

/**
 * @param  {String} pm
 * @return {Object}
 */
export function getDownloadUrl(pm) {

  let ii = 0;
  let length = DownloadUrls.length;

  let node = null;

  for (; ii < length; ++ii) {
    node = DownloadUrls[ii];
    if (node.bundle_name === pm) {
      return (node);
    }
  };

  return (null);

}

/**
 * @param  {String} pm
 * @return {Object}
 */
export function getDownloadUrlByAssetId(id) {

  let ii = 0;
  let length = DownloadUrls.length;

  let node = null;
  let index = 0;

  for (; ii < length; ++ii) {
    node = DownloadUrls[ii];
    if (node.asset_id.substring(index) === id) {
      return (node);
    }
  };

  return (null);

}

export function getGenerationIdByAssetId(asset_id) {

  let index = asset_id.lastIndexOf("/") + 1;
  
  return (
    parseInt(asset_id.substring(index))
  );

}

export function randomRequestId() {
  return (
    1e18 - Math.floor(Math.random() * 1e18)
  );
}