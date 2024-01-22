import FilterPets from "./FilterPets";
import PetInterface from "./Pet";

export default interface DataFilterPets{
    pets:PetInterface[],
    filterData:FilterPets
}