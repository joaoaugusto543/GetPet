const createToken = require('../helpers/createToken')
const encryptPassword = require('../helpers/encryptPassword')
const User= require('../models/User')

module.exports=class UserControllers{
    static async createUser(req,res){
        try {

            const {name,email,password,image,phone,uf,city}=req.body

            const encryptedPassword=await encryptPassword(password)

            const user={
                name,
                email,
                password:encryptedPassword,
                phone,
                uf,
                city
            }

            if(image){
                user.image=image
            }

            const userExists=await User.findOne({email})

            if(userExists){
                return res.status(422).json({error:'User already exists'})
            }

            const newUser=await User.create(user)

            const token= createToken(newUser._id)

            return res.status(200).json({
                user:newUser,
                token:token
            })


            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'})
        }
    }
}