// @ts-nocheck
"use strict";
const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  OK: "Success",
  CREATED: "Created",
};

class SuccessResponse {
  constructor({ message, statusCode, reasonStatusCode, metadata = {} }) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }
  send(res, header = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({
    options = {},
    message,
    metadata,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
  }) {
    super({ message, metadata, statusCode, reasonStatusCode });
    this.options = options;
  }
}

class CREATED extends SuccessResponse {
  constructor({
    options = {},
    message,
    metadata,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
  }) {
    super({ message, metadata, statusCode, reasonStatusCode });
    this.options = options;
  }
}

module.exports = {
  OK,
  CREATED,
};
