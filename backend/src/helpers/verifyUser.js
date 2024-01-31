const User = require('../models/User')
const sendEmail = require('./sendEmail')
const verifyCode = require('./verifyCode')

async function verifyUser(req,res,next){
    try {

        const {email,code}=req.body

        const user=await User.findOne({email})
        
        if(!user){
            return res.status(404).json({error:'User not found'})
        }

        if(user.checked){
            return next()
        }

        if(!code){
            return res.status(422).json({error:'Invalid code'})
        }

        if(!await verifyCode(user,code)){
            return res.status(422).json({error:'Incorrect code'})
        }

        user.checked=true
        user.code=null

        await User.updateOne({_id:user.id},{$set:user})

        const content={
            type:'checked',
            name:user.name,
            email
        }

        await sendEmail(content)
        
        return next()
          
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

module.exports=verifyUser