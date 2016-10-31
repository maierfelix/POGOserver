import fs from "fs";
import fse from "fs-extra";
import pogo from "pogo-asset-downloader";
import POGOProtos from "pokemongo-protobuf";

import print from "./print";
import CFG from "../cfg";

import * as shared from "./shared";

import GameMaster from "./models/GameMaster";

import {
  _toCC,
  capitalize,
  idToPkmnBundleName
} from "./utils";

export function setup() {

  return new Promise((resolve, reject) => {

    // make sure all assets got loaded properly
    this.validateAssets().then(() => {

      print(`Downloaded assets are valid! Proceeding..`);

      shared.GAME_MASTER = new GameMaster(this);

      this.setupDatabaseConnection().then(() => {
        if (CFG.PORT < 1) {
          print("Invalid port!", 31);
          return void 0;
        }
        this.socket = this.createHTTPServer();
        setTimeout(this::this.cycle, 1);
        let localIPv4 = this.getLocalIPv4();
        print(`Server listening at ${localIPv4}:${CFG.PORT}`, 33);
        resolve();
      });

    }).catch((e) => {
      print("Error: " + e + " was not found!", 31);
      this.initDumpSession().then(resolve);
    });

  });

}

export function initDumpSession() {
  print("Required assets are missing! Preparing dump session..", 33);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      this.onFirstRun(() => {
        this.setup().then(resolve);
      });
    }, 1e3);
  });
}

/**
 * Make sure all required
 * assets got loaded properly
 */
export function validateAssets() {

  return new Promise((resolve, reject) => {

    // validate game master
    if (!this.fileExists(CFG.DUMP_ASSET_PATH + "game_master")) {
      return reject("File game_master");
    }

    this.validateModels().then(() => {
      resolve();
    }).catch((e) => {
      reject(e);
    });

  });

}

export function validateModels() {

  let max = CFG.MAX_POKEMON_NATIONAL_ID;
  let limit = pogo.platforms.length;

  return new Promise((resolve, reject) => {
    const validate = (index) => {
      let platform = pogo.platforms[index].name;
      let path = CFG.DUMP_ASSET_PATH + platform + "/";

      // ups, validate asset_digest's too
      if (!this.fileExists(path + "asset_digest")) {
        return reject(`${path}asset_digest`);
      }
      else {
        let buffer = fs.readFileSync(path + "asset_digest");
        shared.GAME_ASSETS[platform] = {
          buffer: buffer,
          decode: this.parseProtobuf(buffer, "POGOProtos.Networking.Responses.GetAssetDigestResponse")
        };
      }

      // validate models inside folder
      let ii = 0;
      while (++ii <= max) {
        let id = idToPkmnBundleName(ii);
        if (!this.fileExists(path + id)) {
          return reject("Model " + id);
        }
      };

      if (++index >= limit) {
        resolve();
        return void 0;
      }
      validate(index);
    };

    validate(0);
  });

}

export function onFirstRun(resolve) {
  print(`Attempt to login with ${_toCC(CFG.DOWNLOAD_PROVIDER)}..`, 33);
  pogo.login({
    provider: CFG.DOWNLOAD_PROVIDER, // google or ptc
    username: CFG.DOWNLOAD_USERNAME,
    password: CFG.DOWNLOAD_PASSWORD
  }).then(() => {
    print(`Successfully logged in!`);
    this.downloadAssetDigests().then(() => {
      this.downloadAssets().then(resolve);
    });
  }).catch((e) => {
    print(e, 31);
  });
}

export function downloadAssetDigests(assets) {
  return new Promise((resolve, reject) => {
    // create data folder for each support platform
    // and download each asset digest and related models
    let index = 0;
    let length = pogo.platforms.length;
    for (let platform of pogo.platforms) {
      fse.ensureDirSync(CFG.DUMP_ASSET_PATH + platform.name);
      pogo.getAssetDigest(platform).then((asset) => {
        fs.writeFileSync(CFG.DUMP_ASSET_PATH + platform.name + "/asset_digest", asset.toBuffer());
        if (++index >= length) resolve();
      });
    };
  });
}

export function downloadAssets() {
  return new Promise((resolve, reject) => {
    pogo.getGameMaster().then((master) => {
      fs.writeFileSync(CFG.DUMP_ASSET_PATH + "game_master", master.toBuffer());
      this.downloadModels().then(() => {
        resolve();
      });
    });
  });
}

export function downloadModels() {

  let limit = pogo.platforms.length;

  return new Promise((resolve, reject) => {
    const dump = (index) => {
      let platform = pogo.platforms[index];
      let name = platform.name;
      let caps = capitalize(name);
      caps = name === "ios" ? "iOS" : caps;
      pogo.setPlatform(name);
      print(`Preparing to dump ${caps} assets..`, 36);
      this.dumpPkmnModels(CFG.DUMP_ASSET_PATH + name + "/", () => {
        print(`Dumped ${CFG.MAX_POKEMON_NATIONAL_ID} ${caps} assets successfully!`);
        if (++index >= limit) {
          print("Dumped all assets successfully!");
          resolve();
          return void 0;
        }
        dump(index);
      });
    };
    dump(0);
  });

}

export function dumpPkmnModels(path, resolve) {

  let limit = CFG.MAX_POKEMON_NATIONAL_ID;

  const dump = (index) => {
    let ids = [];
    if (++index <= limit) ids.push(index);
    if (++index <= limit) ids.push(index);
    if (++index <= limit) ids.push(index);
    pogo.getAssetByPokemonId(ids).then((downloads) => {
      downloads.map((item) => {
        print(`Dumping model ${item.name}..`, 35);
        try {
          fs.writeFileSync(path + item.name, item.body);
        }
        catch (e) {
          print(`Error while dumping model ${item.name}:` + e, 31);
        }
      });
      if (index >= limit) {
        //print(`Dumped ${limit} assets successfully!`);
        resolve();
        return void 0;
      }
      setTimeout(() => dump(index), 1e3);
    });
  };

  dump(0);

}