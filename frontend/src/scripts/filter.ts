import PetInterface from "../interfaces/Pet";
import FilterPets from "../interfaces/FilterPets";


export default function filter(pets:PetInterface[],filterPets:FilterPets | undefined){

    if(!filterPets){
        return pets
    }

    const {city,uf,species,available,size}=filterPets

    const petsFiltered=pets.filter(pet =>{

        if(city && pet.user.city !== city){
            return
        }

        if(uf && pet.user.uf !== uf){
            return
        }

        if(species && pet.species.indexOf(`${species}`) === -1){
            return
        }

        if(available && available==='notAdopted' && pet.available){
            return
        }

        if(available && available==='adopted' && !pet.available){
            return
        }

        if(size && pet.size !== size){
            return
        }

        return pet


    })

    return petsFiltered
}