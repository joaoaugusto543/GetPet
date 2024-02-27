import { useState } from 'react'
import Warning from '../Warning/Warning'
import { useAppDispatch, useAppSelector } from '../../store'
import { deletePetThunk } from '../../slices/petsSlices'

type Props={
    id:string
}

function ButtonDeletePet({id}:Props) {

  const [showWarning,setShowWarning]=useState<boolean>(false)

  const dispatch = useAppDispatch()

  const {token} = useAppSelector(state => state.auth)

  function deletePet(){

    if(!token){
      return
    }

    dispatch(deletePetThunk({id,token}))
  }

  return (
    <>
      {showWarning && <Warning text='Tem certeza que deseja excluir esse pet?' action={deletePet} setShow={setShowWarning}/>}
      <button onClick={()=>setShowWarning(true)}>Deletar</button>
    </>
  )
}

export default ButtonDeletePet
