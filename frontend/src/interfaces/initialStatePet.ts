import PetInterface from './Pet';

export default interface InitialStatePet{
    pets:PetInterface[],
    petsDashboard:PetInterface[],
    myPets:PetInterface[],
    petDashboard:null | PetInterface,
    pet:PetInterface | null,
    loading:boolean,
    error: null | string | string[] | unknown,
    success:boolean
}