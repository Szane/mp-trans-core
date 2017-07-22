/**
 * Created by Szane on 17/7/22.
 */

let config = require('../config/SystemConfig');
let redis = require('redis');
let redisClient = redis.createClient(config.redisConfig.url);
const logger = require('../util/Logger').createLogger('Redis');
redisClient.on("error", function (err) {
    logger.error(err);
});
module.exports = redisClient;