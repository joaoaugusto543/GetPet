const createToken = require('../helpers/createToken')
const encryptPassword = require('../helpers/encryptPassword')
const cloudinary = require('../helpers/configCloudinary')
const User= require('../models/User')
const sendEmail = require('../helpers/sendEmail')
const sendVerificationCode = require('../helpers/sendVerificationCode')
const encryptCode = require('../helpers/encryptCode')
const verifyCode = require('../helpers/verifyCode')
const verifyPassword = require('../helpers/verifyPassword')

module.exports=class UserControllers{

    static async createUser(req,res){
        try {

            const {name,email,password,phone,uf,city}=req.body
        
            const userExists=await User.findOne({email})
            
            if(userExists){
                return res.status(422).json({error:'User already exists'})
            }

            const encryptedPassword=await encryptPassword(password)

            const code=await sendVerificationCode(email)

            const profileImage=req.file

            const encryptedCode= await encryptCode(code)
            
            const user={
                name,
                email,
                password:encryptedPassword,
                phone,
                uf,
                city,
                code:encryptedCode
            }
            
            if(profileImage){
                const resul=await cloudinary.uploader.upload(profileImage.path)
                
                user.profileImage=resul.url
                
            }
                        
            await User.create(user)

            const newUser=await User.findOne({email}).select('-password -code')
            
            return res.status(200).json(newUser)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'})
        }
    }

    static async updateCode(req,res) {

        const {email}=req.body

        const user=await User.findOne({email})
            
        if(!user){
            return res.status(422).json({error:'User already exists'})
        }

        if(user.checked){
            return res.status(200).json({message:'Checked'})
        }

        const code=await sendVerificationCode(email)

        const encryptedCode= await encryptCode(code)

        user.code=encryptedCode

        await User.updateOne({email},{$set:user})

        return res.status(200).json({message:'Send'})
    }

}