var crypto = require('crypto');

/**
 * Add a md5 signature to the password
 * @type {{SECRET: string, md5: (function(*=): string)}}
 */
module.exports = {
    SECRET: 'sfre%4$5&67876dsf7dsf097*fg',
    md5: function (str) {
        var hash = crypto.createHash('md5');
        hash.update(str);
        return hash.digest('hex');
    }
}