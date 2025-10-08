// @ts-nocheck
"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokensPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const {
  BadRequestError,
  ConflictRequestError,
} = require("../core/error.response");

const SALT = 10;
const ROLE_SHOP = {
  SHOP: "0001", // shop
  WRITER: "0002", // writer
  EDITOR: "0003",
  ADMIN: "0004",
};

class AccessService {
  static signUp = async ({ email, password, name }) => {
    //-step 1: check email exists??
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new BadRequestError("::ERROR::Shop already registered!!");
    }
    //--create new shop
    const hashPassword = await bcrypt.hash(password, SALT);
    const newShop = await shopModel.create({
      name,
      email,
      password: hashPassword,
      roles: [ROLE_SHOP["SHOP"]],
    });
    //--generate a token access
    if (newShop) {
      //--created PrivateKey & PublicKey
      //--::level MEDIUM
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      console.log("--keys::", { privateKey, publicKey });

      //--save collection to keys store
      const keysStore = await KeyTokenService.createkeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keysStore) {
        throw new BadRequestError("::ERROR::keysStore Error!!");
      }
      console.log("::created keysStore::", keysStore);
      //--create pair of tokens ..
      const tokens = await createTokensPair({
        payload: {
          userId: newShop._id,
          email,
        },
        privateKey: privateKey,
        publicKey: publicKey,
      });
      console.log("::created Tokens success::", tokens);
      return {
        code: 201,
        metadata: {
          shop: getInfoData({
            fields: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        },
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };
}

module.exports = AccessService;

// viet kieu statics
