const jwt= require('jsonwebtoken')
const crypto = require('crypto')

function createToken(id){
    const secureToken =crypto.randomBytes(32).toString('hex')

    const token= jwt.sign({id},secureToken,{expiresIn:'7d'})

    return token
}

module.exports=createToken