// @ts-nocheck
"use strict";
// --level 0
// const config = {
//   app: {
//     port: process.env.PORT,
//   },
//   db: {
//     host: "localhost",
//     port: 27017,
//     name: "ECoffeeDev",
//   },
// };

//---------level 1
const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "ECoffeeDev",
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 300,
  },
  db: {
    host: process.env.PRO_DB_HOST || "localhost",
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || "ECoffeePro",
  },
};

const config = {
  dev,
  pro,
};

const env = process.env.NODE_DEV || "dev";

module.exports = config[env];
