import ImagesPet from './imagesPet'

export interface DataPet{
    [key:string]:any
    name:string,
    size:string,
    images:(File | ImagesPet)[],
    species:string,
    description:string,
}