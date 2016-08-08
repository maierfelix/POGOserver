export const SERVER_PORT = 3000;
export const SERVER_HOST_IP = "127.0.0.1";
export const SERVER_GAME_MODE = 0;
export const SERVER_TICK_INTERVAL = 1; // better dont change
export const SERVER_SAVE_INTERVAL = 120000; // all 120s
export const SERVER_MAX_CONNECTIONS = 64;
export const SERVER_PLAYER_CONNECTION_TIMEOUT = 1e3 * 60 * 30; // 30min

export const SERVER_DEFAULT_CONSOLE_COLOR = 32;

export const ASSET_DIGEST_PATH = "asset_digest";

export const MINIMUM_CLIENT_VERSION = "0.31.0";

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

export const SERVER_MONGO_PORT = 27017;
export const SERVER_MONGO_HOST_IP = "localhost";
export const SERVER_MONGO_DB_NAME = "pokemongo";
export const SERVER_MONGO_COLLECTION_USERS = "users";
export const SERVER_MONGO_URL = `mongodb://${SERVER_MONGO_HOST_IP}:${SERVER_MONGO_PORT}/${SERVER_MONGO_DB_NAME}`;

export const SERVER_GMAPS_API_KEY = "AIzaSyDF9rkP8lhcddBtvH9gVFzjnNo13WtmJIM";