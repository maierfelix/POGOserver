import Avatar from "./Avatar";
import MapObject from "../World/MapObject";

import { GAME_MASTER } from "../../master";

/**
 * @class Player
 */
export default class Player extends MapObject  {

  /**
   * @param {Object} obj
   * @constructor
   */
  constructor(obj) {

    super(null);

    this.request = obj.request;
    this.response = obj.response;

    this.authenticated = 0;
/*
    this.bag = new Bag(this);
    this.info = new Info(this);
    this.pary = new Party(this);
    this.avatar = new Avatar(this);
    this.pokedex = new Pokedex(this);
    this.tutorial = new Tutorial(this);
*/
  }

}