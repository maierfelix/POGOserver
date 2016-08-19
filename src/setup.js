import fs from "fs";
import fse from "fs-extra";
import pogo from "pogo-asset-downloader";
import proto from "./proto";

import CFG from "../cfg";

export function setup() {

  let isFirstRun = !!fse.ensureDirSync("data/");

  if (isFirstRun) {
    this.print("Preparing to dump required assets..", 36);
    setTimeout(() => {
      this.onFirstRun(() => {
        this.setup();
      });
    }, 1e3);
    return void 0;
  }

  this.asset = this.parseAssetDigest();

  this.setupDatabaseConnection().then(() => {
    if (CFG.PORT < 1) {
      this.print("Invalid port!", 31);
      return void 0;
    }
    this.socket = this.createHTTPServer();
    setTimeout(this::this.cycle, 1);
    let localIPv4 = this.getLocalIPv4();
    this.print(`Server running at ${localIPv4}:${CFG.PORT}`);
  });

}

export function parseAssetDigest() {
  let asset = null;
  try {
    asset = proto.Networking.Responses.GetAssetDigestResponse.decode(fs.readFileSync("data/asset_digest"));
  } catch (e) {
    this.print(e, 31);
  }
  return (asset);
}

export function onFirstRun(resolve) {
  pogo.login({
    provider: CFG.DOWNLOAD_PROVIDER, // google or ptc
    username: CFG.DOWNLOAD_USERNAME,
    password: CFG.DOWNLOAD_PASSWORD
  }).then((asset) => {
    this.print(`Dumping asset digest..`, 35);
    fs.writeFileSync("data/asset_digest", asset.toBuffer());
    this.dumpPkmnModels(() => {
      resolve();
    });
  });
}

export function dumpPkmnModels(resolve) {

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
          fs.writeFileSync("data/" + item.name, item.body);
        }
        catch (e) {
          this.print(`Error while dumping model ${item.name}:` + e, 31);
        }
      });
      if (index >= limit) {
        this.print(`Dumped ${limit} assets successfully!`);
        resolve();
        return void 0;
      }
      setTimeout(() => dump(index), 2e3);
    });
  };

  dump(0);

}