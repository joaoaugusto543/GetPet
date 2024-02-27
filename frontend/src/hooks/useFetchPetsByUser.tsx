import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { getPetsByUser, resetPetsDashBoard } from '../slices/petsSlices'

function useFetchPetsByUser() {

   const {petsDashboard,loading} = useAppSelector(state => state.pet)
   const {token} = useAppSelector(state => state.auth)
   const dispatch=useAppDispatch()

   useEffect(()=>{
        if(token){
            dispatch(resetPetsDashBoard())
            dispatch(getPetsByUser({token}))
        }
   },[])

   return {pets:petsDashboard,loading}

}

export default useFetchPetsByUser
