import POGOProtos from "pokemongo-protobuf";
import pcrypt from "pcrypt";

import CFG from "../cfg";

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

let hashIndex = 1;

/**
 * @return {Number}
 */
export function getUniqueHash() {
  if (++hashIndex >= Number.MAX_SAFE_INTEGER) {
    hashIndex = 0;
  }
  return (hashIndex);
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
}

export function deXOR(value, hash) {
  let out = "";
  let ii = 0;
  let length = value.length;
  for (; ii < length; ++ii) {
    out += String.fromCharCode(hash ^ value.charCodeAt(ii));
  };
  return (out);
}

/**
 * @return {Number}
 */
export function randomRequestId() {
  return (
    1e18 - Math.floor(Math.random() * 1e18)
  );
}

/**
 * @param {String} key
 * @return {String}
 */
export function _toCC(key) {
  key = key.toLowerCase();
  let res = key[0].toUpperCase() + key.substring(1, key.length).replace(/_\s*([a-z])/g, function(d, e) {
    return e.toUpperCase();
  });
  return (res);
}

/**
 * @param {Number} index
 * @return {String}
 */
export function idToPkmnBundleName(index) {
  return (
    "pm" + (index >= 10 ? index >= 100 ? "0" : "00" : "000") + index
  );
}

/**
 * @param {String} str
 * @return {String}
 */
export function capitalize(str) {
  return (
    str[0].toUpperCase() + str.slice(1)
  );
}

/**
 * @param {String} str
 * @return {String}
 */
export function deCapitalize(str) {
  return (
    str[0].toLowerCase() + str.slice(1)
  );
}

let rx_username = /[^a-z\d]/i;
export function validUsername(str) {
  return (
    !(rx_username.test(str))
  );
}

let rx_email = /\S+@\S+\.\S+/;
export function validEmail(str) {
  return (
    !!rx_email.test(str)
  );
}

/**
 * @param {Request} req
 */
export function parseSignature(req) {
  let key = pcrypt.decrypt(req.unknown6[0].unknown2.encrypted_signature);
  return (
    POGOProtos.parseWithUnknown(key, "POGOProtos.Networking.Envelopes.Signature")
  );
}