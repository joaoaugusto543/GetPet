import { useLayoutEffect } from 'react'
import useFetchPetsByUser from './useFetchPetsByUser'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import { resetPet } from '../slices/petsSlices'
import useFetchPetDashboard from './useFetchPetDashboard'

type Props={
    id:string | undefined
}

function useVerifyPet({id}:Props) {

  const {petDashboard,error} = useAppSelector(state => state.pet)

  useFetchPetDashboard({id})

  const {pets} = useFetchPetsByUser()

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  function verifyPet(){

    const petExists = pets.find((petItem) => petItem._id === petDashboard?._id)

    if(!petExists){
        dispatch(resetPet())
        navigate('/')
        return
    }

    return
  }

  useLayoutEffect(()=>{
    if(petDashboard && id && pets.length !== 0){
        verifyPet()
    }

  },[id,petDashboard,pets])

  useLayoutEffect(()=>{

    if(error && id){
      verifyPet()
    }

  },[error,id])
}

export default useVerifyPet
