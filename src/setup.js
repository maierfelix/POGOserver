import fs from "fs";
import fse from "fs-extra";
import pogo from "pogo-asset-downloader";
import POGOProtos from "pokemongo-protobuf";

import CFG from "../cfg";

import * as master from "./master";

import GameMaster from "./models/GameMaster";

import {
  capitalize,
  idToPkmnBundleName
} from "./utils";

export function setup() {

  let save = JSON.parse(fs.readFileSync(".save", "utf8"));

  if (save.isFirstRun) {
    this.print("Required assets are missing! Preparing dump session..", 33);
    setTimeout(() => {
      this.onFirstRun(() => {
        save.isFirstRun = false;
        fs.writeFileSync(".save", JSON.stringify(save), "utf8");
        this.setup();
      });
    }, 1e3);
    return void 0;
  }

  // make sure all assets got loaded properly
  this.validateAssets().then(() => {

    this.print(`Downloaded assets are valid! Proceeding..`);

    master.GAME_MASTER = this.parseGameMaster();

    this.master = POGOProtos.serialize(fs.readFileSync(CFG.DUMP_ASSET_PATH + "game_master"), "POGOProtos.Networking.Responses.DownloadItemTemplatesResponse");

    this.setupDatabaseConnection().then(() => {
      if (CFG.PORT < 1) {
        this.print("Invalid port!", 31);
        return void 0;
      }
      this.socket = this.createHTTPServer();
      setTimeout(this::this.cycle, 1);
      let localIPv4 = this.getLocalIPv4();
      this.print(`Server listening at ${localIPv4}:${CFG.PORT}`, 33);
    });

  }).catch((e) => {
    //fse.removeSync(CFG.DUMP_ASSET_PATH);
    this.print("Error: " + e + " was not found!", 31);
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
      let platform = pogo.platforms[index];
      let name = platform.name;
      let path = CFG.DUMP_ASSET_PATH + name + "/";

      // ups, validate asset_digest's too
      if (!this.fileExists(path + "asset_digest")) {
        return reject(`${path}asset_digest`);
      }
      else {
        let buffer = fs.readFileSync(path + "asset_digest");
        this.assets[name] = {
          buffer: buffer,
          decode: this.parseProtobuf(buffer, "POGOProtos.Networking.Responses.GetAssetDigestResponse")
        }
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

export function parseGameMaster() {
  let master = null;
  try {
    let data = fs.readFileSync(CFG.DUMP_ASSET_PATH + "game_master");
    master = this.parseProtobuf(data, "POGOProtos.Networking.Responses.DownloadItemTemplatesResponse");
    let Master = new GameMaster(master);
  } catch (e) {
    this.print(e, 31);
  }
  return (master);
}

export function onFirstRun(resolve) {
  // make sure to login first!
  pogo.login({
    provider: CFG.DOWNLOAD_PROVIDER, // google or ptc
    username: CFG.DOWNLOAD_USERNAME,
    password: CFG.DOWNLOAD_PASSWORD
  }).then(() => {
    this.downloadAssetDigests().then(() => {
      this.downloadAssets().then(resolve);
    });
  }).catch((e) => {
    this.print(e, 31);
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
      this.print(`Preparing to dump ${caps} assets..`, 36);
      this.dumpPkmnModels(CFG.DUMP_ASSET_PATH + name + "/", () => {
        this.print(`Dumped ${CFG.MAX_POKEMON_NATIONAL_ID} ${caps} assets successfully!`);
        if (++index >= limit) {
          this.print("Dumped all assets successfully!");
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
        this.print(`Dumping model ${item.name}..`, 35);
        try {
          fs.writeFileSync(path + item.name, item.body);
        }
        catch (e) {
          this.print(`Error while dumping model ${item.name}:` + e, 31);
        }
      });
      if (index >= limit) {
        //this.print(`Dumped ${limit} assets successfully!`);
        resolve();
        return void 0;
      }
      setTimeout(() => dump(index), 1e3);
    });
  };

  dump(0);

}