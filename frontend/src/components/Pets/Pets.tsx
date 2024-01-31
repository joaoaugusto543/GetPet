import styles from './Pets.module.css'
import Pet from '../Pet/Pet'
import useFetchPets from '../../hooks/useFetchPets'
import Filter from '../Filter/Filter'
import { useEffect, useState } from 'react'
import PetInterface from '../../interfaces/Pet'

function Pets() {

  const petsFetch=useFetchPets()

  const [pets,setPets]=useState<PetInterface[]>([])

  useEffect(()=>{
    if(petsFetch){
      setPets(petsFetch)
    }
  },[petsFetch])

  return (
    <section className={styles.pets}>
        {pets.map(pet =><Pet pet={pet} key={pet._id}/>)}
        <Filter pets={petsFetch} setPets={setPets}/>
    </section>
  )
}

export default Pets
