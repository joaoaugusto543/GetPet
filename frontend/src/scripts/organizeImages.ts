import PetInterface from '../interfaces/Pet';

function organizeImages(pets:PetInterface[] | PetInterface){

    if(!Array.isArray(pets)){

        const orderedImages=pets.images.sort((current,previous)=>{

            if(current.position < previous.position){
                return -1
            }else{
                return 1
            }
        })

        pets.images=orderedImages

        return pets

    }

    const organizedPets=pets.map((pet)=>{

        const orderedImages=pet.images.sort((current,previous)=>{

            if(current.position < previous.position){
                return -1
            }else{
                return 1
            }
        })

        pet.images=orderedImages

        return pet

    })

    return organizedPets

}

export default organizeImages