/**
 * Created by Szane on 17/7/22.
 */
let crypto = require('crypto');
let md5Key = "mp".toString('ascii');
exports.encryptByMd5 = async(clearText)=> {
    let md5 = crypto.createHmac('md5', md5Key);
    return md5.update(clearText).digest('hex').toUpperCase();
};