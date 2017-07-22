/**
 * Created by Szane on 17/7/22.
 */
const log4js = require('log4js');
const config = require('../config/SystemConfig');

exports.createLogger = (name)=> {
    log4js.configure(config.loggerConfig.config);
    let logger = log4js.getLogger(name);
    logger.setLevel(config.loggerConfig.level);
    return logger;
};
