// @ts-nocheck
"us strict";
const JWT = require("jsonwebtoken");

const createTokensPair = async ({ payload, publicKey, privateKey }) => {
  try {
    //access token
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    // refresh token
    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    //---OPT:verify
    JWT.verify(accessToken, publicKey, (error, decode) => {
      if (!!error) {
        console.error(`error:::verify::`, error);
      } else {
        console.log(`decode:::verify::`, decode);
      }
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    return;
  }
};

module.exports = {
  createTokensPair,
};
