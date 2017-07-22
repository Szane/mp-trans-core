/**
 * Created by Szane on 17/7/22.
 */
let sysMsg = require('./SystemMsg.js');
let restifyError = require('restify-errors');

let CODES = {
    BadDigest: 400,
    BadMethod: 405,
    Internal: 500,
    InvalidArgument: 409,
    InvalidContent: 400,
    InvalidCredentials: 401,
    InvalidHeader: 400,
    InvalidVersion: 400,
    MissingParameter: 409,
    NotAuthorized: 403,
    PreconditionFailed: 412,
    RequestExpired: 400,
    RequestThrottled: 429,
    ResourceNotFound: 404,
    WrongAccept: 406
};
let InvalidArgumentError = (msg, outMsg)=> {
    let error = new restifyError.InvalidArgumentError(msg);
    if (outMsg) {
        error.body.outMsg = outMsg;
    }
    return error;
};

let BadMethodError = (msg, outMsg)=> {
    let error = new restifyError.BadMethodError(msg);
    if (outMsg) {
        error.body.outMsg = outMsg;
    }
    return error;
};

let NotAuthorizedError = (msg, outMsg)=> {
    if (msg == null) {
        msg = sysMsg.SYS_AUTH_TOKEN_ERROR;
    }
    if (outMsg == null) {
        outMsg = sysMsg.SYS_AUTH_TOKEN_ERROR
    }
    let error = new restifyError.NotAuthorizedError(msg);
    error.body.outMsg = outMsg;

    return error;
};

let MissingParameterError = (msg, outMsg)=> {
    let error = new restifyError.MissingParameterError(msg);
    if (outMsg) {
        error.body.outMsg = outMsg;
    }
    return error;
};
let ResourceNotFoundError = (msg, outMsg)=> {
    let error = new restifyError.ResourceNotFoundError(msg);
    if (outMsg) {
        error.body.outMsg = outMsg;
    }
    return error;
};
let InternalError = (msg, outMsg)=> {
    let error = new restifyError.InternalError(msg);
    if (outMsg) {
        error.body.outMsg = outMsg;
    }
    return error;
};
module.exports = {
    CODES: CODES,
    InvalidArgumentError: InvalidArgumentError,
    NotAuthorizedError: NotAuthorizedError,
    MissingParameterError: MissingParameterError,
    ResourceNotFoundError: ResourceNotFoundError,
    BadMethodError: BadMethodError,
    InternalError: InternalError
};