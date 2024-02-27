import { useLayoutEffect } from 'react'
import useFetchPetsByUser from './useFetchPetsByUser'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store'

type Props={
    id:string | undefined
}

function useVerifyPet({id}:Props) {

  const {pet} = useAppSelector(state => state.pet)

  const {pets} = useFetchPetsByUser()

  const navigate = useNavigate()

  function verifyPet(){

    const petExists = pets.find((petItem) => petItem._id === pet?._id)

    if(!petExists){
        navigate('/')
        return
    }

    return
  }

  useLayoutEffect(()=>{
    if(pet && id && pets.length !== 0){
        verifyPet()
    }
  },[id,pet])
}

export default useVerifyPet
