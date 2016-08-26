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

let rx_username = /[^a-z\d]/i;
export function validUsername(str) {
  return (
    !!(rx_username.test(str))
  );
}