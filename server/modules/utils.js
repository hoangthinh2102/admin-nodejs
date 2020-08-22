const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const JWT_SECRET = 'my secret string'

/**
 * @summary this function will hash a string by algorithm md5
 * @param {String} str 
 * @returns {String}
 */
// hash: mã hóa 1 chiều, không giải được
function hashMd5(str) {
    return crypto.createHash('md5').update(str).digest('hex')
}




/**
 * @summary encode object to an token
 * @param {Object} object
 * @returns {String} 
 */
function signToken(object) {
    return jwt.sign(object, JWT_SECRET, {
        expiresIn: '6h'
    })
}


function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    hashMd5,
    signToken,
    verifyToken
}


// class User {
//     constructor(){
//         this.name = {
//             lastname: '',
//             firstname: ''
//         }
//         this.age = 0
//     }

//     print() {}
// }

const User = {
    name: { firstname: '', lastname: ''},
    age: 0
}

/**
 * @type {User}
 */
let m = {}

/**
 * @type {User}
 */

 let m2 = {}