/**
 * Created by Szane on 17/7/22.
 */
let redisClient = require('../db/RedisCon.js');
const QUERY_EXPIRED = 60 * 60;
const logger = require('../util/Logger').createLogger('Redis');

async function setStringVal(params) {
    try {
        await redisClient.set(params.key, params.value);
        if (params.expired) {
            await redisClient.expire(params.key, params.expired);
        }
        return null;
    } catch (e) {
        logger.error(e);
        return e;
    }
}

async function setObjectVal(params) {
    try {
        await redisClient.set(params.key, JSON.stringify(params.value));
        if (params.expired) {
            await redisClient.expire(params.key, QUERY_EXPIRED);
        }
        return null;
    } catch (e) {
        logger.error(e);
        return e;
    }
}
async function getObjectVal(params) {
    let value = await redisClient.get(params.key);
    return JSON.parse(value);
}
function setAsyStringVal(params) {
    if (params.expired && parseInt(params.expired)) {
        redisClient.set(params.key, params.value, 'EX', params.expired);
    } else {
        redisClient.set(params.key, params.value);
    }
    redisClient.get(params.key, function (error, result) {
        logger.debug(error || result);
    });
}

async function getStringVal(params) {
    try {
        return await redisClient.get(params.key);
    } catch (e) {
        logger.error(e);
        return null;
    }
}

async function removeStringVal(params, callback) {
    await redisClient.del(params.key, function (error, result) {
        logger.debug('removeStringVal');
        callback(error, result);
    });
}
function removeKeyByPrefix(params, callback) {
    redisClient.keys(params.prefix + "*", function (error, keys) {
        logger.debug(keys);
        keys.forEach(function (key) {
            redisClient.del(key, function (error, result) {
                logger.debug('removeKeyByPrefix');
            });
        });
        callback(error, keys);
    });
}
function expireStringVal(params) {
    redisClient.expire(params.key, params.expired);
}

module.exports = {
    setStringVal: setStringVal,
    getStringVal: getStringVal,
    setObjectVal: setObjectVal,
    getObjectVal: getObjectVal,
    setAsyStringVal: setAsyStringVal,
    removeStringVal: removeStringVal,
    expireStringVal: expireStringVal,
    removeKeyByPrefix: removeKeyByPrefix
};