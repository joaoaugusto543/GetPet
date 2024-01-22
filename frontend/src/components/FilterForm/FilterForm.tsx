import React, { useState } from 'react'
import SelectUfs from '../SelectUfs/SelectUfs'
import SelectCities from '../SelectCities/SelectCities'
import styles from './FilterForm.module.css'
import useFilter from '../../hooks/useFilter'

type Props={
    handleFilter:Function
}

function FilterForm({handleFilter}:Props) {
    
    const [species,setSpecies]=useState<String>('')
    const [size,setSize]=useState<String>('')
    const [available,setAvailable]=useState<String>('')
    const [uf,setUf]=useState<String>('')
    const [city,setCity]=useState<String>('')

    const {handleCloseFilter}=useFilter()

    function handleSubmit(e:React.BaseSyntheticEvent){
        e.preventDefault()

        const filterData={
            species,
            size,
            available,
            uf,
            city
        }

        handleFilter(filterData)
        handleCloseFilter()
    }

    function handleCleaFilter(e:React.BaseSyntheticEvent){
        e.preventDefault()

        setSpecies('')
        setSize('')
        setAvailable('')
        setUf('')
        setCity('')

        handleFilter({})
        handleCloseFilter()
    }

   

  return (
    <form id='formFilter' className={styles.filterForm}>
        <label>
            <span>Espécie:</span>
            <input type='text' placeholder='Digite a espécie que deseja adotar' value={typeof(species) === 'string' ? species : ''} onChange={(e)=>setSpecies(e.target.value)}/>
        </label>
        <label>
            <span>Tamanho:</span>
            <select name='tamanho' value={typeof(size) === 'string' ? size : ''} onChange={(e)=>setSize(e.target.value)}>
                <option value=''>Selecione um tamanho</option>
                <option value='Grande'>Grande</option>
                <option value='Médio'>Médio</option>
                <option value='Pequeno'>Pequeno</option>
            </select>
        </label>
        <label>
            <span>Adotado:</span>
            <select name='adopted' value={typeof(available) === 'string' ? available : ''} onChange={(e)=>setAvailable(e.target.value)}>
                <option value=''>Selecione uma opção</option>
                <option value='adopted'>Sim</option>
                <option value='notAdopted'>Não</option>
            </select>
        </label>
        <label>
            <span>Estado:</span>
            <SelectUfs setUf={setUf} uf={uf}/>
        </label>
        <label>
            <span>Cidade:</span>
            <SelectCities setCity={setCity} uf={uf} city={city}/>
        </label>
        <div className={styles.buttons}>
            <input type='submit' onClick={handleSubmit} value='Filtrar' />
            <input type='submit' onClick={handleCleaFilter} value='Limpar' />
        </div>
    </form>
  )
}

export default FilterForm
