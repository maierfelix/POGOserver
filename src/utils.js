import proto from "./proto";

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