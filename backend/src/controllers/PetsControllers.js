const Pet= require('../models/Pet')
const cloudinary=require('../helpers/configCloudinary')

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
                
            return res.status(200).json(pet)
                
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'})
        }

    }

    static async getPetsByUser(req,res){
        try {

            const {email}=req.user
  
            const pets= await Pet.find().select('name images _id user')

            const userPets= pets.filter((pet)=>pet.user.email === email)
                    
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

}