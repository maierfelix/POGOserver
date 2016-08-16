import mongodb from "mongodb";

import * as CFG from "../../cfg";

export function setupConnection() {

  let url = `mongodb://${CFG.SERVER_MONGO_HOST_IP}:${CFG.SERVER_MONGO_PORT}/${CFG.SERVER_MONGO_DB_NAME}`;

  return new Promise((resolve) => {
    mongodb.MongoClient.connect(url, (error, db) => {
      if (error) {
        this.print(error, 31);
      } else {
        this.db.instance = db;
        this.loadCollection(CFG.SERVER_MONGO_COLLECTION_USERS).then(() => {
          resolve();
        });
      }
    });
  });

}

/**
 * @param {Function} resolve
 */
export function closeConnection(resolve) {
  this.db.instance.close(() => {
    resolve();
  });
}

/**
 * @param {String} name
 */
export function loadCollection(name) {

  return new Promise((resolve) => {
    this.db.instance.listCollections({name: name}).next((err, exists) => {
      if (!exists) this.createCollection(name).then((coll) => resolve());
      else {
        this.db.instance.collection(name, (err, coll) => {
          resolve();
        });
      }
    });
  });

}

/**
 * @param {String} name
 */
export function createCollection(name) {
  return new Promise((resolve) => {
    this.db.instance.createCollection(name, {}, (err, coll) => {
      resolve();
    });
  });
}

/**
 * @param {String} email
 */
export function getUserByEmail(email) {
  return new Promise((resolve) => {
    let collection = this.getUserCollection();
    collection.find({email: email}).toArray((err, docs) => {
      resolve(docs);
    });
  });
}

export function getUserCollection() {
  return (
    this.db.instance.collection(CFG.SERVER_MONGO_COLLECTION_USERS)
  );
}

/**
 * @param {Object} obj
 */
export function createUser(obj) {

  let collection = this.getUserCollection();

  let user = this.getUserData(obj);

  return new Promise((resolve) => {
    collection.insert([user], (error, result) => {
      resolve();
    });
  });

}

/**
 * @param {Object} obj
 */
export function updateUser(obj) {

  let collection = this.getUserCollection();

  let user = this.getUserData(obj);

  return new Promise((resolve) => {
    collection.update({email: user.email}, user, (error, result) => {
      resolve();
    });
  });

}

/**
 * @param  {Object} obj
 * @return {Object}
 */
export function getUserData(obj) {
  return ({
    username: obj.username,
    email: obj.email,
    exp: obj.exp,
    stardust: obj.stardust,
    pokecoins: obj.pokecoins,
    team: obj.team,

    skin: obj.skin,
    hair: obj.skin,
    shirt: obj.skin,
    pants: obj.skin,
    hat: obj.skin,
    shoes: obj.skin,
    eyes: obj.skin,
    gender: obj.skin,
    backpack: obj.skin,

    latitude: obj.latitude,
    longitude: obj.latitude,
    altitude: obj.latitude,

    send_marketing_emails: false,
    send_push_notifications: false
  });
}