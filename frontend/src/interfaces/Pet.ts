interface PetInterface{
    id:string,
    name:string,
    size:string,
    images:String[],
    available:boolean,
    species:String,
    description:String,
    user:{
        name:String
        phone:String
        city:string
        uf:string
    },
    adopter:null | {
        name:string
    }

}

export default PetInterface