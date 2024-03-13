import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { profileThunk, resetSuccess } from "../slices/userSlices"


function useFetchUser() {
  
   const {token} = useAppSelector(state => state.auth)

   const {user,success} = useAppSelector(state => state.user)

   const dispatch = useAppDispatch()

   useEffect(()=>{

        if(!token){
            return
        }

        dispatch(profileThunk({token}))
   },[token])

   useEffect(()=>{
    if(success){
        dispatch(resetSuccess())
    }
   },[success])

   return user

}

export default useFetchUser
