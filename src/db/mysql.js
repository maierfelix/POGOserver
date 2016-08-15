import mysql from "mysql";

import * as CFG from "../../cfg";

export function setupMySQL() {

  let connection = mysql.createConnection({
    host     : CFG.SERVER_MYSQL_HOST_IP,
    port     : CFG.SERVER_MYSQL_PORT,
    database : CFG.SERVER_MYSQL_DB_NAME,
    user     : CFG.SERVER_MYSQL_USERNAME,
    password : CFG.SERVER_MYSQL_PASSWORD
  });

  return new Promise((resolve) => {
    connection.connect((error) => {
      if (error) {
        this.print(error, 31);
        return void 0;
      }
      this.db.instance = connection;
      resolve();
    });
  });

}