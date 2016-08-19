export default {

  // Server settings
  MAX_CONNECTIONS: 64,
  PORT: 3000,
  GAME_MODE: 0,
  TICK_INTERVAL: 1,
  SAVE_INTERVAL: 60000,
  PLAYER_CONNECTION_TIMEOUT: 1800000,
  BOOT_TIMEOUT: 10000,
  MINIMUM_CLIENT_VERSION: "0.33.0",
  DEFAULT_CONSOLE_COLOR: 32,
  TRANSFER_ACCOUNTS: false,

  // Choose a database type
  DATABASE_TYPE: "MYSQL",

  // MySQL credentials
  MYSQL_PORT: 3306,
  MYSQL_HOST_IP: "127.0.0.1",
  MYSQL_DB_NAME: "pogosql",
  MYSQL_USERNAME: "root",
  MYSQL_PASSWORD: "",
  MYSQL_TABLE: "users",

  // MongoDB credentials
  MONGO_PORT: 27017,
  MONGO_HOST_IP: "127.0.0.1",
  MONGO_DB_NAME: "pokemongo",
  MONGO_COLLECTION_USERS: "users",

  // Used for asset download session
  DOWNLOAD_PROVIDER: "GOOGLE",
  DOWNLOAD_USERNAME: "USERNAME",
  DOWNLOAD_PASSWORD: "PASSWORD",

  // Google maps api key
  GMAPS_KEY: "AIzaSyDF9rkP8lhcddBtvH9gVFzjnNo13WtmJIM",

  // Server debug options
  DEBUG_DUMP_PATH: "./logs/",
  DEBUG_DUMP_TRAFFIC: true,
  DEBUG_LOG_REQUESTS: true

}