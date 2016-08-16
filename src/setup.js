import path from "path";

import * as CFG from "../cfg";

export function setup() {

  this.print("Booting server..", 33);

  this.createAssetDownloadSession().then(() => {
    this.setupDatabaseConnection().then(() => {

      let dbType = String(CFG.SERVER_USE_DATABASE).toLowerCase();
      let name = dbType === "mongo" ? "MongoDB" : "MySQL";

      this.print(`\x1b[36;1m${name}\x1b[0m\x1b[${CFG.SERVER_DEFAULT_CONSOLE_COLOR};1m connection established\x1b[0m`);

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