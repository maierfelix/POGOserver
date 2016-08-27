import Avatar from "./Avatar";
import MapObject from "../World/MapObject";
import POGOProtos from "pokemongo-protobuf";
import jwtDecode from "jwt-decode";

import print from "../../print";
import CFG from "../../../cfg";

import * as _packets from "./packets";

import { inherit } from "../../utils";

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

    this.world = obj.world;

    this._team = 0;

    this.username = "unknown";

    this._email = null;
    this.email_verified = false;

    this.isPTCAccount = false;
    this.isGoogleAccount = false;

    this.hasSignature = false;

    this.authenticated = false;

    this.request = null;
    this.response = null;

    this.remoteAddress = null;

    this.maxPkmnStorage = 250;
    this.maxItemStorage = 350;

/*
    this.bag = new Bag(this);
    this.info = new Info(this);
    this.pary = new Party(this);
    this.avatar = new Avatar(this);
    this.pokedex = new Pokedex(this);
    this.tutorial = new Tutorial(this);
*/

    this.refreshSocket(obj.request, obj.response);

  }

  get team() {
    return (this._team);
  }
  set team(value) {
    this.team = value;
  }

  get email() {
    return (this._email);
  }
  set email(value) {
    this.email = value;
    this.username = this.email;
  }

  /**
   * @param {Buffer} buffer
   */
  sendResponse(buffer) {
    this.response.end(buffer);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  refreshSocket(req, res) {
    this.request = req;
    this.response = res;
  }

  authenticate() {

    let request = POGOProtos.parseWithUnknown(this.request.body, "POGOProtos.Networking.Envelopes.RequestEnvelope")

    let msg = this.GetAuthTicket(request.request_id);

    let token = request.auth_info;

    if (!token || !token.provider) {
      print("Invalid authentication token! Kicking..", 31);
      this.world.removePlayer(this);
      return void 0;
    }

    if (token.provider === "google") {
      if (token.token !== null) {
        let decoded = jwtDecode(token.token.contents);
        this.email = decoded.email;
        this.email_verified = decoded.email_verified;
        this.isGoogleAccount = true;
        print(`${this.email} connected!`, 36);
      }
      else {
        print("Invalid authentication token! Kicking..", 31);
        this.world.removePlayer(this);
        return void 0;
      }
    }
    else {
      print("Invalid provider! Kicking..", 31);
      this.world.removePlayer(this);
      return void 0;
    }

    this.authenticated = true;

    this.sendResponse(msg);

  }

  /**
   * @param {String} type
   * @param {Object} msg
   */
  getPacket(type, msg) {
    return new Promise((resolve) => {
      switch (type) {
        case "GET_PLAYER":
          resolve(this.GetPlayer(msg));
        break;
      };
    });
  }

}

inherit(Player, _packets);