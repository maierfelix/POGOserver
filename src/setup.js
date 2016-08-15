import path from "path";

import * as CFG from "../cfg";

export function setup() {

  this.print("Booting server..", 33);

  this.createAssetDownloadSession().then(() => {
    this.print("Created asset download session");
    this.setupDatabaseConnection().then(() => {

      this.print("Database connection established");

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

export function setupDatabaseConnection() {

  return new Promise((resolve) => {

    let name = String(CFG.SERVER_USE_DATABASE).toUpperCase();

    switch (name) {
      case "MONGO":
      case "MONGODB":
        this.setupMongo().then(resolve);
      break;
      case "MYSQL":
        this.setupMySQL().then(resolve);
      break;
      default:
        this.print("Invalid database connection type!", 31);
        return void 0;
      break;
    };

  });

}