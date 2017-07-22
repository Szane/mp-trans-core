/**
 * Created by Szane on 17/7/22.
 */
const Sequelize = require('sequelize');
const config = require('../config/SystemConfig');
const logger = require('../util/Logger').createLogger('db.js');
logger.debug('init sequelize...');

let sequelize = new Sequelize(config.mysqlConfig.database, config.mysqlConfig.username, config.mysqlConfig.password, {
    host: config.mysqlConfig.host,
    port: config.mysqlConfig.port,
    dialect: config.mysqlConfig.dialect,
    pool: {
        max: 5, // max
        min: 0, // min
        idle: 10000 //10 seconds
    },
    logging: function (sql) {
        logger.debug(sql);
    }
});
let defineModel = (tableName, column)=> {
    return sequelize.define(tableName, column, {
        underscored: true,
        freezeTableName: true,
        updatedAt: 'updated_on',
        createdAt: 'created_on'
    });
};
/**
 * sql查询
 * @param queryStr
 * @param conditions
 * @returns {Promise}
 */
let simpleSelect = async(queryStr, conditions) => {
    return await sequelize.query(queryStr, {
        replacements: conditions,
        type: sequelize.QueryTypes.SELECT
    });
};
/**
 * 事务方法
 * @param options
 * @param autoCallback
 * @returns {Promise}
 */
let transaction = async function (options, autoCallback) {
    return sequelize.transaction(options, autoCallback);
};
module.exports = {
    sequelize: sequelize, simpleSelect: simpleSelect,
    transaction: transaction, defineModel: defineModel
};