"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECOND = 5000;
//--count connections
const countConnect = () => {
  const numbConnections = mongoose.connections.length;
  console.log(`Number of connections::${numbConnections}`);
};

//-- check overload connections
const checkOverload = () => {
  setInterval(() => {
    const numbConnections = mongoose.connections.length;
    const numbCore = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    //--example maximum number of connection based on number of core  is 5
    const maxConnections = numbCore * 5;

    console.log(`Active connections:: ${numbConnections}`);
    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);
    console.log(`Cups core:: ${numbCore}`);

    //--check
    if (numbConnections >= maxConnections) {
      console.log(`PING::PING::PING -> Connections overload detected !!!`);
      //--notify.send()
    }
  }, _SECOND); // Monitor every 5 second
};

module.exports = {
  countConnect,
  checkOverload,
};
