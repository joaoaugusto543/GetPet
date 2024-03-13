import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { getPetDashboardThunk, resetPetDashboard } from '../slices/petsSlices'

type Props={
    id:string | undefined
}

function useFetchPetDashboard({id}:Props) {

    const {petDashboard} = useAppSelector(state => state.pet)
    const {token} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
 
    useEffect(()=>{
        if(id && token){
            dispatch(resetPetDashboard())
            dispatch(getPetDashboardThunk({id,token}))
        }
    },[id])

    return petDashboard

}

export default useFetchPetDashboard
