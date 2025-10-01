const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

//--init middlewares
app.use(morgan("dev")); // dev | combined | short | tiny
app.use(helmet());
app.use(compression());

//--init db
require("./dbs/init.mongodb");
const { checkOverload } = require("./helpers/check.connect");
checkOverload();
//--init routes
app.get("/", (req, res, next) => {
  const strCompr =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  return res.status(200).json({
    message: "Welcome to ECoffee!",
    metadata: strCompr.repeat(1000),
  });
});

//--handing errors

module.exports = app;
