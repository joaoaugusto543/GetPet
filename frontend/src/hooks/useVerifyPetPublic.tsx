import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store'

async function useVerifyPetPublic() {

  const {error} = useAppSelector(state => state.pet)

  const navigate = useNavigate()

  function verifyPet(){

    if(error === 'Unauthorized' || error === 'Internal error'){
      navigate('/')
      window.location.reload()
    }
    
    return
  }

  useEffect(()=>{
    if(error){
        verifyPet()
    }

  },[error])

}

export default useVerifyPetPublic
