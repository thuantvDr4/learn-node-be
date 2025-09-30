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

//--init routes
app.get("/", (req, res, next) => {
  const strCompr =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
  return res.status(200).json({
    message: "Welcome to ECoffee!",
    metadata: strCompr.repeat(1000),
  });
});

//--handing errors

module.exports = app;
