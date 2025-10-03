// @ts-nocheck
"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  static createkeyToken = async ({ userId, publicKey }) => {
    try {
      const publicKeyStr = publicKey.toString();
      const token = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyStr,
      });
      return token ? token.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
