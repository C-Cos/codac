let crypto = require('crypto');
//user = require('../Models/user');

function hashPassword(password){
    let salt='pepper';
    const hash = crypto.createHash('sha1');
    let pass_hash = hash.update(salt+password, 'utf-8');
    return pass_hash.digest('hex');
}

function createUser(username,email,password,association,postcode,city){
    
    var newUser = {
        username:username,
        email:email,
        password: hashPassword(password),
        creation_date: new Date(),
        edition_date: new Date(),
        admin: false,
        association: association,
        postcode: postcode,
        city: city
    }

    return newUser;
}

function verifyPassword(inputpassword,bddpassword) {
    let checkpassword=hashPassword(inputpassword);
    if(checkpassword===bddpassword){
        return true;
    }
    else {
        return false;
    }
}

module.exports = { hashPassword, createUser, verifyPassword };