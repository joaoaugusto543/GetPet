interface PetInterface{
    _id:string,
    name:string,
    size:string,
    images:string[],
    available:boolean,
    species:string,
    description:string,
    user:{
        name:string
        image:string
        email:string
        phone?:string
        city:string
        uf:string
    },
    adopter:null | {
        name:string
    }

}

export default PetInterface