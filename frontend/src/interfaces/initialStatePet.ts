import PetInterface from "./Pet";

export default interface initialStatePet{
    pets:PetInterface[],
    pet:PetInterface | null,
    loading:boolean,
    error: null | string | string[] | unknown
}