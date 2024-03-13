import styles from './Pets.module.css'
import Pet from '../Pet/Pet'
import useFetchPets from '../../hooks/useFetchPets'
import Filter from '../Filter/Filter'
import { useEffect, useState } from 'react'
import PetInterface from '../../interfaces/Pet'
import Empty from '../Empty/Empty'
import { useAppSelector } from '../../store'
import LoaderPet from '../Loaders/LoaderPet/LoaderPet'

function Pets() {

  const petsFetch=useFetchPets()

  const [pets,setPets]=useState<PetInterface[]>([])

  const {loading} = useAppSelector(state => state.pet)

  useEffect(()=>{
    if(petsFetch){
      setPets(petsFetch)
    }
  },[petsFetch])

  return (
    <section className={styles.pets}>
        {!loading && pets.map(pet =><Pet pet={pet} key={pet._id}/>)}
        {!loading && pets.length === 0 && <Empty text='Pets não encontrados'/>}
        {!loading && <Filter pets={petsFetch} setPets={setPets}/>}
        {loading && <LoaderPet/>}
    </section>
  )
}

export default Pets
