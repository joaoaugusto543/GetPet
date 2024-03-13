const encryptPassword = require('../helpers/encryptPassword')
const cloudinary = require('../helpers/configCloudinary')
const User= require('../models/User')
const Pet= require('../models/Pet')
const sendVerificationCode = require('../helpers/sendVerificationCode')
const encryptCode = require('../helpers/encryptCode')
const sendEmail = require('../helpers/sendEmail')

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

        try {
            
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

        } catch (error) {
           console.log(error)
           return res.status(500).json({error:'Internal error'}) 
        }

    }

    static async profile(req,res){
        try {
            
            const userReq = req.user

            const user = await User.findOne({email:userReq.email}).select('name email uf city profileImage phone')

            if(!user){
                return res.status(422).json({error:'User not found'})
            }

            return res.status(200).json(user)

        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'}) 
        }
    }

    static async updateUser(req,res){
        try {
            
            const {name,phone,uf,city} = req.body

            const userReq = req.user

            const user = await User.findOne({email:userReq.email}).select('name email uf city profileImage phone')

            const profileImage = req.file

            if(!user){
                return res.status(422).json({error:'User not found'})
            }

            if(profileImage){

                const urlArray = user.profileImage.split('/')

                const publicId = urlArray[urlArray.length - 1].split('.')[0]

                if(publicId !== 'p6uv3s57jyfatagksntg'){
                    
                    await cloudinary.uploader.destroy(publicId)

                }

                const res=await cloudinary.uploader.upload(profileImage.path)

                user.profileImage = res.url

            }

            if(name){
                user.name = name
            }

            if(phone){
                user.phone = phone
            }else{
                user.phone = null
            }

            if(uf){
                user.uf = uf
            }

            if(city){
                user.city = city
            }

            await User.updateOne({_id:user.id},user)

            const pets = await Pet.find()

            const myPets = pets.filter((pet) => pet.user.email === user.email)

            for(let i=0; myPets.length > i; i++){

                myPets[i].user.name=user.name
                myPets[i].user.phone=user.phone
                myPets[i].user.uf=user.uf
                myPets[i].user.city=user.city
                myPets[i].user.profileImage=user.profileImage
                
                await Pet.updateOne({_id:myPets[i].id},myPets[i])

            }

            return res.status(200).json(user)

        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'}) 
        }
    }

    static async sendMessage(req,res){
        try {
            
            const { petName,message,email } = req.body

            const user = req.user

            //email -> email to which the message will be sent
            //userEmail -> email of the person who sent the message

            const content={
                type:'message',
                email,
                userName:user.name,
                petName,
                message,
                userEmail:user.email
            }

            await sendEmail(content)

            return res.status(200).json({message:'Ok'})

        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'}) 
        }
    }

}