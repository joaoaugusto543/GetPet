import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { getPets } from '../slices/petsSlices'


function useFetchPets() {

    const {pets:petsRedux}=useAppSelector(state => state.pet)
    const dispatch=useAppDispatch()

    useEffect(()=>{
        dispatch(getPets())
    },[])

    return petsRedux
}

export default useFetchPets