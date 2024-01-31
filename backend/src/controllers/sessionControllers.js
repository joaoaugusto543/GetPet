const verifyPassword = require('../helpers/verifyPassword')
const createToken = require('../helpers/createToken')
const User = require('../models/User')

module.exports = class SessionControllers{

    static async createSession(req,res){
        try {

            const {email,password}=req.body

            const user= await User.findOne({email})

            if(!user){
                return res.status(422).json({error:'Incorrect password/email'})
            }

            if(!await verifyPassword(user,password)){
                return res.status(422).json({error:'Incorrect password/email'})
            }

            const token=createToken(user._id)

            const {id,name,image,profileImage}=user

            return res.status(200).json({
                user:{
                    id,
                    name,
                    email,
                    image,
                    profileImage
                },
                token
            })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'})
        }
    }
}