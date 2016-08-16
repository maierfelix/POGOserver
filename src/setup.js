import path from "path";

import * as CFG from "../cfg";

export function setup() {

  this.print("Booting server..", 33);

  this.createAssetDownloadSession().then(() => {
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