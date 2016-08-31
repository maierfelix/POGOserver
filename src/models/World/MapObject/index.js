/**
 * @class MapObject
 */
export default class MapObject {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    this.uid = 0;

    this.cellId = null;

    this.world = null;

    this.altitude = 0;
    this.latitude = 0;
    this.longitude = 0;

    this._init(obj);

  }

  /**
   * @param {Object} obj
   */
  _init(obj) {
    obj = obj || {};
    for (let key in obj) {
      if (this.hasOwnProperty(key)) {
        this[key] = obj[key];
      }
      else if (key === "id") {
        this.uid = obj[key];
      }
      else if (key === "cell_id") {
        this.cellId = obj[key];
      }
    };
  }

}