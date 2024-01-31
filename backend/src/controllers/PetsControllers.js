const Pet= require('../models/Pet')

module.exports=class PetsContollers{
    
    static async createPet(req,res){
        try {

            const {name,size,images,available,species,description,user,adopter}=req.body

            

            const newPet=await Pet.create(req.body)

            return res.status(200).json(newPet)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:'Internal error'})
        }
    }

    static async getPets(req,res){

        try {
            
            const pets= await Pet.find()
    
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
}