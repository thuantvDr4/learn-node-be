// @ts-nocheck
"use strict";
const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");

const connectStr = `mongodb://localhost:27017/ECoffee`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectStr, {
        maxPoolSize: 50,
      })
      .then(() => {
        console.log(`Connect MongoDB Success PRO`);
        // countConnect();
      })
      .catch((err) => console.log(`Error Connect!`));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
