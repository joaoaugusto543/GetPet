const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function auth(req,res,next){

    const authHeader=req.headers.authorization

    if(!authHeader){
        return res.status(401).json({error:'Token was not provided'})
    }

    const [,token]=authHeader.split(' ')

    try {

        const secret=process.env.TOKEN_SECRET

        const decoded=await promisify(jwt.verify)(token,secret)

        const user=await User.findById(decoded.id)

        req.user=user

        return next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({error:'Invalid token'})
    }
}

module.exports=auth