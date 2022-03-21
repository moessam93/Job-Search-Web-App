const crypto = require('crypto');

function validPassword(password, hash, salt) {
    let hashVerify = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex');
    return hashVerify === hash;
}

function genPassword(password) {
    let salt = crypto.randomBytes(32).toString('hex');
    let genHash = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex'); 
    return{
        salt:salt,
        hash:genHash
    }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;