/**
 * Created by Szane on 17/7/22.
 */
let sysError = require('./SystemError.js');
let sysMsg = require('./SystemMsg.js');

let sendQueryRes = (res, result, next)=> {
    res.send(200, {success: true, result: result});
    if (next)
        return next();
};
let sendCreateRes = (res, result, next)=> {
    if (result && result.insertId)
        res.send(200, {success: true, id: result.insertId});
    else
        res.send(200, {success: false, msg: errMsg});
    if (next)
        return next();
};
let sendUpdateRes = (res, result, next)=> {
    if (result && result.affectedRows > 0)
        res.send(200, {success: true});
    else
        res.send(200, {success: false, msg: errMsg});
    if (next)
        return next();
};
let sendFailedRes = (res, errMsg, next)=> {
    res.send(200, {success: false, msg: errMsg});
    if (next)
        return next();
};
let sendSuccessRes = (res, next)=> {
    res.send(200, {success: true});
    if (next)
        return next();
};
let resInternalError = (error, res, next)=> {
    return next(sysError.InternalError(sysMsg.SYS_INTERNAL_ERROR_MSG));
};
let resNoAuthorizedError = (error, res, next)=> {
    return next(sysError.NotAuthorizedError());
};

module.exports = {
    sendQueryRes: sendQueryRes,
    sendCreateRes: sendCreateRes,
    sendUpdateRes: sendUpdateRes,
    sendFailedRes: sendFailedRes,
    sendSuccessRes: sendSuccessRes,
    resInternalError: resInternalError,
    resNoAuthorizedError: resNoAuthorizedError
};




