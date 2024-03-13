import { useEffect, useState } from "react"
import { acceptAdoptionThunk, resetSuccess } from "../../slices/petsSlices"
import { useAppDispatch, useAppSelector } from "../../store"
import { useNavigate } from "react-router-dom"
import Warning from "../Warning/Warning"

type Props={
  idUser:string,
  idPet:string
}

function AcceptButton({idUser,idPet}:Props) {

  const dispatch = useAppDispatch()

  const { token } = useAppSelector(state => state.auth)

  const { success,loading } = useAppSelector( state => state.pet)

  const [showWarning, setShowWarning] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(()=>{

      if(success){
        dispatch(resetSuccess())
        navigate('/')

      }

  },[success])

  function handleAcceptAdoption(){

      if(idPet && idUser && token){

        dispatch(acceptAdoptionThunk({idPet,idUser,token}))

      }

  }

  function openWarning(){
    setShowWarning(true)
  }


  return (
    <>
      {!loading ? <button onClick={openWarning}>Aceitar</button> : <button disabled>Aguarde...</button>}
      {showWarning && <Warning text='Têm certeza que quer aceitar o pedido?' setShow={setShowWarning} action={handleAcceptAdoption}/>}
    </>
  )
}

export default AcceptButton
