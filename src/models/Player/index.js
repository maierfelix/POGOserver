import POGOProtos from "pokemongo-protobuf";
import jwtDecode from "jwt-decode";

import Info from "./Info";
import Party from "./Party";
import Avatar from "./Avatar";
import Contact from "./Contact";
import Tutorial from "./Tutorial";
import Currency from "./Currency";

import MapObject from "../World/MapObject";

import print from "../../print";
import CFG from "../../../cfg";

import * as _packets from "./packets";

import {
  inherit,
  parseSignature
} from "../../utils";

import { GAME_MASTER } from "../../shared";

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
    this._email = null;

    this.username = "unknown";

    this.email_verified = false;

    this.platform = null;

    this.isPTCAccount = false;
    this.isGoogleAccount = false;

    this.isIOS = false;
    this.isAndroid = false;

    this.hasSignature = false;

    this.authenticated = false;

    this.request = null;
    this.response = null;

    this.remoteAddress = null;

    this.maxPkmnStorage = 250;
    this.maxItemStorage = 350;

    this.info = new Info(this);
    this.party = new Party(this);
    this.avatar = new Avatar(this);
    this.contact = new Contact(this);
    this.currency = new Currency(this);
    this.tutorial = new Tutorial(this);

/*
    this.bag = new Bag(this);
    this.info = new Info(this);
    this.pokedex = new Pokedex(this);
*/

    this.refreshSocket(obj.request, obj.response);

  }

  get team() {
    return (this._team);
  }
  set team(value) {
    this._team = value;
  }

  get email() {
    return (this._email);
  }
  set email(value) {
    this._email = value;
    this.username = value.replace("@gmail.com", "");
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
    this.request = POGOProtos.parseWithUnknown(req.body, "POGOProtos.Networking.Envelopes.RequestEnvelope");
    this.response = res;
  }

  authenticate() {

    let request = this.request;

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

  getDevicePlatform() {

    let request = this.request;

    if (request.unknown6 && request.unknown6[0]) {
      let sig = parseSignature(request);
      if (sig.device_info !== void 0) {
        this.hasSignature = true;
        this.isIOS = sig.device_info.device_brand === "Apple";
        this.isAndroid = !this.isIOS;
        this.platform = this.isIOS ? "ios" : "android";
        print(`${this.email} is playing with an ${this.isIOS ? "Apple" : "Android"} device!`, 36);
      }
    }

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
        case "GET_INVENTORY":
          resolve(this.GetInventory(msg));
        break;
        case "GET_ASSET_DIGEST":
          resolve(this.GetAssetDigest(msg));
        break;
        case "GET_HATCHED_EGGS":
          resolve(this.GetHatchedEggs(msg));
        break;
        case "CHECK_AWARDED_BADGES":
          resolve(this.CheckAwardedBadges(msg));
        break;
      };
    });
  }

}

inherit(Player, _packets);