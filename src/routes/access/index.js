"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../middleware/handleError");

const router = express.Router();

//---sign up
router.post("/shop/signup", asyncHandler(accessController.signUp));

module.exports = router;
