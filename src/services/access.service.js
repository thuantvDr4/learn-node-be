// @ts-nocheck
"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokensPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

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
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });
        console.log("--keys::", { privateKey, publicKey });

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

        //-- convert publickey objec
        const publicKeyObj = crypto.createPublicKey(publicKeyString);
        console.log("::PubliceKey::object", publicKeyObj);

        //--create pair of tokens ..
        const tokens = await createTokensPair({
          payload: {
            userId: newShop._id,
            email,
          },
          privateKey: privateKey,
          publicKey: publicKeyObj,
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
