import mongodb from "mongodb";

import * as CFG from "../cfg";

/**
 * @param {Function} resolve
 */
export function setupMongo(resolve) {

  mongodb.MongoClient.connect(CFG.SERVER_MONGO_URL, (error, db) => {
    if (error) {
      this.print("Unable to connect to database", 31);
    } else {
      this.db.instance = db;
      this.loadCollection(CFG.SERVER_MONGO_COLLECTION_USERS).then(() => {
        resolve();
      });
    }
  });

}

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

export function createCollection(name) {
  return new Promise((resolve) => {
    this.db.instance.createCollection(name, {}, (err, coll) => {
      resolve();
    });
  });
}

export function getUserByEmail(email) {
  return new Promise((resolve) => {
    let collection = this.getUserCollection();
    collection.find({email: email}).toArray((err, docs) => {
      resolve(docs[0]);
    });
  });
}

export function getUserCollection() {
  return (
    this.db.instance.collection(CFG.SERVER_MONGO_COLLECTION_USERS)
  );
}

export function createUser(obj) {

  let collection = this.getUserCollection();

  let user = {
    username: obj.username,
    email: obj.email,
    position: obj.position,
    exp: obj.exp,
    stardust: 1337,
    pokecoins: 1338,
    avatar: obj.avatar,
    contact_settings: obj.contact_settings
  };

  return new Promise((resolve) => {
    collection.insert([user], (error, result) => {
      resolve();
    });
  });

}

export function updateUser(obj) {

  let collection = this.getUserCollection();

  let user = {
    username: obj.username,
    email: obj.email,
    position: obj.position,
    exp: obj.exp,
    stardust: 1337,
    pokecoins: 1338,
    avatar: obj.avatar,
    contact_settings: obj.contact_settings
  };

  return new Promise((resolve) => {
    collection.update({email: obj.email}, user, (error, result) => {
      resolve();
    });
  });

}