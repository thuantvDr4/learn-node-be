"use strict";
const mongoose = require("mongoose");
const connectStr = `mongodb://localhost:27017/ECoffee`;
mongoose
  .connect(connectStr)
  .then(() => {
    console.log(`Connect MongoDB Success`);
  })
  .catch((err) => console.log(`Error Connect!`));

//--dev
if (1 === 1) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;
