import ImagesPet from './imagesPet'

export default interface PetDashboard{
    _id:string,
    name:string,
    images:ImagesPet[],
    user:{
        name: string,
        phone?: string,
        city: string,
        uf: string,
        email: string,
        profileImage: string
    }

}