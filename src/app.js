require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

//--init middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev")); // dev | combined | short | tiny
app.use(helmet());
app.use(compression());

//--init db
require("./dbs/init.mongodb");
const { checkOverload } = require("./helpers/check.connect");
// checkOverload();

//--init routes
app.use("/", require("./routes"));
//--handing errors

module.exports = app;
