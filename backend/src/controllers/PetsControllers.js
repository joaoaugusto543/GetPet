const Pet= require('../models/Pet')
const cloudinary=require('../helpers/configCloudinary')
const sendEmail = require('../helpers/sendEmail')
const User = require('../models/User')

module.exports=class PetsContollers{
    
    static async createPet(req,res){
        try {

            const {name,size,species,description}=req.body

            const user=req.user

            const images=req.files

            if(images.length === 0){
                return res.status(422).json({error:'Image is required'})
            }

            const imagesPet=[]

            for(let i=0; images.length > i; i++){
                const resul=await cloudinary.uploader.upload(images[i].path)

                const imagePet={
                    position:i + 1,
                    url:resul.url
                }

                imagesPet.push(imagePet)
            }

            const pet={
                name,
                size,
                species,
                description,
                adopter:null,
                images:imagesPet,
                user:{
                    id:user._id,
                    name:user.name,
                    phone:user.phone,
                    city:user.city,
                    uf:user.uf,
                    email:user.email,
                    profileImage:user.profileImage
                }
            }


            const newPet=await Pet.create(pet)

            return res.status(200).json(newPet)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'})
        }
    }

    static async getPets(req,res){

        try {
            
            const pets= await Pet.find().select('name description images _id user size available species')
    
            return res.status(200).json(pets)

        } catch (error) {
          console.log(error)
            return res.status(500).json({error:'Internal error'})  
        }
    }

    static async getPet(req,res){
        
        try {
            
            const {id}=req.params
  
            const pet= await Pet.findOne({_id:id})

            if(!pet){
                return res.status(404).json({error:'Pet not found'})
            }

            if(pet.available){
                return res.status(401).json({error:'Unauthorized'})
            }

            pet.candidates= pet.candidates.map(candidate => {
                
                candidate = {
                    id:candidate.id,
                    rejected:candidate.rejected
                }

                return candidate
            })
                
            return res.status(200).json(pet)
                
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'})
        }

    }

    static async getPetDashboard(req,res){
        
        try {
            
            const {id}=req.params
  
            const pet= await Pet.findOne({_id:id})

            const user = req.user

            if(!pet){
                return res.status(404).json({error:'Pet not found'})
            }

            if(user.email !== pet.user.email){
                return res.status(401).json({error:'Unauthorized'})
            }

            if(pet.available){
                return res.status(401).json({error:'Unauthorized'})
            }
     
            return res.status(200).json(pet)
                
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'})
        }

    }

    static async getPetsByUser(req,res){
        try {

            const {email}=req.user
  
            const pets= await Pet.find().select('name images _id user available')

            const userPets= pets.filter((pet)=>pet.user.email === email && !pet.available)
                    
            return res.status(200).json(userPets)

        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'})
        }
    }

    static async addImage(req,res){
        try {

            const file = req.file

            const {id} = req.params

            const user= req.user

            if(!file){
                return res.status(422).json({error:'Image is required'})
            }

            const pet =await Pet.findOne({_id:id})

            if(!pet){
                return res.status(422).json({error:'Pet not found'})
            }

            if(pet.user.email !== user.email){
                return res.status(401).json({error:'Unauthorized'})
            }

            const result=await cloudinary.uploader.upload(file.path)

            const newImage={
                position:pet.images.length + 1,
                url:result.url
            }

            pet.images.push(newImage)

            await Pet.updateOne({_id:id},pet)

            return res.status(200).json(newImage)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'})
        }
    }

    static async updatePet(req,res){
        try {
            
            const {name,species,size,description,images} = req.body

            const {id}= req.params

            const user = req.user

            const pet = await Pet.findOne({_id:id})

            if(pet.user.email !== user.email){
                return res.status(422).json({error:'Unauthorized'})
            }

            if(images.length === 0){
                return res.status(422).json({error:'Image is required'})
            }

            const urls = images.map((image)=>image.url)

            const deletedPhotos = pet.images.filter((image)=> !urls.includes(image.url))

            for(let i=0; i < deletedPhotos.length; i++){

                const urlArray = deletedPhotos[i].url.split('/')

                const publicId= urlArray[urlArray.length - 1].split('.')[0]

                await cloudinary.uploader.destroy(publicId)
            }

            pet.name = name

            pet.species = species

            pet.size = size

            pet.description = description

            pet.images = images

            await Pet.updateOne({_id:pet.id},pet)

            const updatedPet = await Pet.findOne({_id:pet.id})

            return res.status(200).json(updatedPet)

        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'})
        }
    }

    static async deletePet(req,res){
        try {

            const {id} = req.params

            const user = req.user

            const pet = await Pet.findOne({_id:id})

            if(!pet){
                return res.status(422).json({error:'Pet not found'})
            }

            if(pet.user.email !== user.email){
                return res.status(401).json({error:'Unauthorized'})
            }

            if(pet.available){
                return res.status(401).json({error:'Unauthorized'})
            }

            for(let i=0; i < pet.images.length; i++){

                const urlArray = pet.images[i].url.split('/')

                const publicId= urlArray[urlArray.length - 1].split('.')[0]

                await cloudinary.uploader.destroy(publicId)

            }

            await Pet.deleteOne({_id:id})

            return res.status(200).json({id})

        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'})
        }
    }

    static async addCandidates(req,res){
        try {

            const {id} = req.params

            const {email,name,id:idUser,profileImage} = req.user

            const pet = await Pet.findOne({_id:id})

            if(!pet){
                return res.status(422).json({error:'Pet not found'})
            }

            if(email === pet.user.email){
                return res.status(401).json({error:'Unauthorized'})
            }

            if(pet.available){
                return res.status(422).json({error:'Pet unavailable'})
            }

            const candidate = pet.candidates.find((candidate) => candidate.email === email)

            if(candidate){
                return res.status(422).json({error:'Already registered'})
            }

            const newCandidate = {
                id:idUser,
                name,
                profileImage,
                email,
                rejected:false
            }

            pet.candidates.push(newCandidate)

            await Pet.updateOne({_id:id},pet)

            const content={
                type:'addCandidate',
                email:pet.user.email,
                adopterName:name,
                petName:pet.name
            }

            await sendEmail(content)

            return res.status(200).json({
                id:newCandidate.id,
                reject:newCandidate.rejected
            })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'}) 
        }
    }

    static async acceptAdoption(req,res){
        try {

            const {idPet,idUser} = req.params

            //owner

            const reqUser = req.user
 
            const pet = await Pet.findOne({_id:idPet})
            
            //person wanting to adopt

            const user = await User.findOne({_id:idUser})

            if(!pet){
                return res.status(422).json({error:'Pet not found'})
            }

            if(!user){
                return res.status(422).json({error:'User not found'})
            }

            if(reqUser.email !== pet.user.email){
                return res.status(401).json({error:'Unauthorized'})
            }

            if(user.email === pet.user.email){
                return res.status(401).json({error:'Unauthorized'})
            }

            if(pet.available){
                return res.status(422).json({error:'Pet unavailable'})
            }

            const candidate = pet.candidates.find((candidate) => candidate.email === user.email)

            if(!candidate){
                return res.status(422).json({error:'Candidate not found'})
            }

            const otherCandidates = pet.candidates.filter((candidate) => candidate.id !== user.id)

            const emailOfOtherCandidates = otherCandidates.map((candidate)=>candidate.email)

            if(emailOfOtherCandidates.length !== 0){

                const content={
                    type:'declineAdoption',
                    email:emailOfOtherCandidates,
                    petName:pet.name
                }

                await sendEmail(content)
            }

            pet.candidates=[]

            pet.adopter = {
                id:user.id,
                email:user.email
            }

            pet.available = true

            await Pet.updateOne({_id:pet.id},pet)

            const content = {
                type:'acceptAdoption',
                petName:pet.name,
                email:user.email
            }

            await sendEmail(content)

            return res.status(200).json({id:pet.id})

            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'}) 
        }
    }

    static async rejectAdoption(req,res){
        try {

            const {idPet,idUser} = req.params

            //owner

            const reqUser = req.user

            const pet = await Pet.findOne({_id:idPet})

            //person wanting to adopt

            const user = await User.findOne({_id:idUser})

            if(!pet){
                return res.status(422).json({error:'Pet not found'})
            }

            if(!user){
                return res.status(422).json({error:'User not found'})
            }

            if(reqUser.email !== pet.user.email){
                return res.status(401).json({error:'Unauthorized'})
            }

            if(user.email === pet.user.email){
                return res.status(401).json({error:'Unauthorized'})
            }

            if(pet.available){
                return res.status(422).json({error:'Pet unavailable'})
            }

            const candidate = pet.candidates.find((candidate) => candidate.email === user.email)

            if(!candidate){
                return res.status(422).json({error:'Candidate not found'})
            }

            const content={
                type:'declineAdoption',
                email:candidate.email,
                petName:pet.name
            }

            pet.candidates=pet.candidates.map((candidate) =>{

                if(candidate.id === idUser){
                    candidate.rejected=true
                }
                
                return candidate

            })

            await sendEmail(content)
   
            await Pet.updateOne({_id:pet.id},pet)

            return res.status(200).json({id:candidate.id})

            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'}) 
        }
    }

    static async getMyPets(req,res){
        try {

            const user = req.user

            const pets = await Pet.find().select('name images adopter description')

            const myPets = pets.filter((pet)=> pet.adopter && pet.adopter.email === user.email)

            return res.status(200).json(myPets)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'}) 
        }
    }

}