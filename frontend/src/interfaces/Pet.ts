import { CandidateInterface } from './CandidateInterface'
import ImagesPet from './imagesPet'

interface PetInterface{
    _id:string,
    name:string,
    size:string,
    images:ImagesPet[],
    available:boolean,
    species:string,
    description:string,
    candidates: CandidateInterface[],
    user:{
        id:string,
        name:string
        profileImage:string
        email:string
        phone?:string
        city:string
        uf:string
    },
    adopter:null | {
        id:string
    }

}

export default PetInterface