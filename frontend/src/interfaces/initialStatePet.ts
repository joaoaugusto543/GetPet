import PetInterface from "./Pet";

export default interface InitialStatePet{
    pets:PetInterface[],
    pet:PetInterface | null,
    loading:boolean,
    error: null | string | string[] | unknown
}