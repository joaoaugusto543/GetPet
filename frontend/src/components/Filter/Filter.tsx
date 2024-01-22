import FilterForm from '../FilterForm/FilterForm'
import FilterPets from '../../interfaces/FilterPets'
import filter from '../../scripts/filter'
import PetInterface from '../../interfaces/Pet'
import styles from './Filter.module.css'
import ButtonFilter from '../ButtonFilter/ButtonFilter'

type Props={
  setPets:Function
  pets:PetInterface[]
}

function Filter({setPets,pets}:Props) {

  function handleFilter(filterData:FilterPets){
    const filteredPets=filter(pets,filterData)

    setPets(filteredPets)
  }

  return (
    <>
      <section id='filter' className={styles.filter}>
          <h1>Filtro</h1>
          <FilterForm handleFilter={handleFilter}/>
      </section>
      <ButtonFilter/>
    </>
  )
}

export default Filter
