import path from "path";

import * as CFG from "../cfg";

export function setup() {

  var package_json = require('../package.json');
  this.print("Server version: "+package_json.version, 33);
  
  this.print("Booting server..", 33);

  let assetSessionLoaded = false;

  setTimeout(() => {
    if (!assetSessionLoaded) {
      this.print("Boot timeout, please check your login details!", 31);
    }
  }, CFG.SERVER_BOOT_TIMEOUT);

  this.createAssetDownloadSession().then((asset) => {
    assetSessionLoaded = true;
    this.asset = asset;
    this.setupDatabaseConnection().then(() => {

      if (CFG.SERVER_PORT < 1) {
        this.print("Invalid port!", 31);
        return void 0;
      }

      this.socket = this.createHTTPServer();

      setTimeout(this::this.cycle, 1);

      this.print(`Server running at ${CFG.SERVER_HOST_IP}:${CFG.SERVER_PORT}`);

    });
  });

}
