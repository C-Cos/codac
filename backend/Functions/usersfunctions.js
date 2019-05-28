let crypto = require('crypto');

function hashPassword(password){
    let salt='pepper';
    const hash = crypto.createHash('sha1');
    let pass_hash = hash.update(salt+password, 'utf-8');
    return pass_hash.digest('hex');
}

module.exports = hashPassword;