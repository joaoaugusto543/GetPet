import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { getPet, resetPet } from '../slices/petsSlices'

type Props={
    id:string | undefined
}

function useFetchPet({id}:Props) {

    const {pet} = useAppSelector(state => state.pet)
    const dispatch = useAppDispatch()
 
    useEffect(()=>{
        if(id){
            dispatch(resetPet())
            dispatch(getPet({id}))
        }
    },[id])

    return pet

}

export default useFetchPet
