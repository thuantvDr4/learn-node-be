// @ts-nocheck
"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");

const SALT = 10;
const ROLE_SHOP = {
  SHOP: "0001", // shop
  WRITER: "0002", // writer
  EDITOR: "0003",
  ADMIN: "0004",
};

class AccessService {
  static signUp = async ({ email, password, name }) => {
    try {
      //-step 1: check email exists??
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: "xxxx",
          message: "Shop already registered!!",
        };
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
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });
        console.log("--privateKey::", privateKey);
        console.log("--publicKey::", publicKey);

        //--save collection to keys store
        const publicKeyString = await KeyTokenService.createkeyToken({
          userId: newShop._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "PublicKeyString Error!!",
          };
        }

        //--create pair of tokens ..
      }
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;

// viet kieu statics
