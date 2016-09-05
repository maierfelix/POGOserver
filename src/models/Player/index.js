import POGOProtos from "pokemongo-protobuf";

import Bag from "./Bag";
import Info from "./Info";
import Party from "./Party";
import Avatar from "./Avatar";
import CandyBag from "./CandyBag";
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

    this.bag = new Bag(this);
    this.candyBag = new CandyBag(this);

    this.info = new Info(this);
    this.party = new Party(this);
    this.avatar = new Avatar(this);
    this.contact = new Contact(this);
    this.tutorial = new Tutorial(this);
    this.currency = new Currency(this);
    /*
    this.pokedex = new Pokedex(this);
    */
    this.refreshSocket(obj.request, obj.response);

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
        case "SET_FAVORITE_POKEMON":
          resolve(this.SetFavoritePokemon(msg));
        break;
        case "LEVEL_UP_REWARDS":
          resolve(this.LevelUpRewards(msg));
        break;
        case "GET_PLAYER_PROFILE":
          resolve(this.GetPlayerProfile(msg));
        break;
        case "SET_AVATAR":
          resolve(this.SetAvatar(msg));
        break;
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
        case "RECYCLE_INVENTORY_ITEM":
          resolve(this.RecycleInventoryItem(msg));
        break;
      };
    });
  }

  /**
   * @return {Object}
   */
  getPlayerData() {
    return ({
      creation_timestamp_ms: +new Date(),
      username: this.username,
      team: this.info.team,
      tutorial_state: this.tutorial.serialize(),
      avatar: this.avatar.serialize(),
      max_pokemon_storage: 250,
      max_item_storage: 350,
      daily_bonus: {},
      equipped_badge: {},
      contact_settings: this.contact.serialize(),
      currencies: this.currency.serialize(),
      remaining_codename_claims: 0
    });
  }

  inheritByObject(obj) {
    for (let key in obj) {
      // ignore
      if (!(key !== "id")) continue;
      if (!(key !== "email")) continue;
      if (key === "candies") {
        this.candyBag.parseJSON(obj[key]);
      }
      else if (key === "items") {
        this.bag.parseJSON(obj[key]);
      }
      else if (key === "avatar") {
        this.avatar.parseJSON(obj[key]);
      }
      else if (key === "tutorial") {
        this.tutorial.parseJSON(obj[key]);
      }
      else {
        if (this.hasOwnProperty(key)) {
          this[key] = obj[key];
        }
      }
    };
  }

  syncWithDatabase() {
    return new Promise((resolve) => {
      this.loadFromDatabase().then((row) => {
        this.inheritByObject(row);
        resolve();
      });
    });
  }

  loadFromDatabase() {
    let query = `SELECT * from ${CFG.MYSQL_USERS_TABLE} WHERE email=? LIMIT 1`;
    return new Promise((resolve) => {
      this.world.db.query(query, [this.email], (e, rows) => {
        if (e) return print(e, 31);
        if (rows.length >= 1) resolve(rows[0]);
        else print(`Failed to sync player ${this.username} with database!`, 31);
      });
    });
  }

  saveIntoDatabase() {

  }

}

inherit(Player, _packets);