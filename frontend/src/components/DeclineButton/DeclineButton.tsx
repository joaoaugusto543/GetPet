import { useState } from 'react'
import { rejectAdoptionThunk } from '../../slices/petsSlices'
import { useAppDispatch, useAppSelector } from '../../store'
import Warning from '../Warning/Warning'

type Props={
  idUser:string,
  idPet:string
}

function DeclineButton({idUser,idPet}:Props) {

  const dispatch = useAppDispatch()
  const { token } = useAppSelector(state => state.auth)
  const { loading } = useAppSelector(state => state.pet)

  const [showWarning, setShowWarning] = useState<boolean>(false)

  function handleReject(){

    if(!token){
      return
    }

    dispatch(rejectAdoptionThunk({idPet,idUser,token}))
  }

  function openWarning(){
    setShowWarning(true)
  }

  return (
    <>
      {!loading ? <button onClick={openWarning}>Recusar</button> : <button disabled>Aguarde...</button>}
      {showWarning && <Warning text='Têm certeza que quer recusar o pedido?' setShow={setShowWarning} action={handleReject}/>}
    </>
  )
}

export default DeclineButton
