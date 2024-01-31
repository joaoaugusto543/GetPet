import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { getPet } from "../slices/petsSlices"

type Props={
    id:string | undefined
}

function useFetchPet({id}:Props) {

    const {pet} = useAppSelector(state => state.pet)
    const dispatch = useAppDispatch()
 
    useEffect(()=>{
        if(id){
            dispatch(getPet({id}))
        }
    },[id])

    return pet

}

export default useFetchPet
