import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import Message from '../Message/Message'
import { CandidateInterface } from '../../interfaces/CandidateInterface'
import { hideMessageButtonThunk } from '../../slices/buttonSlices'

type Props = {
    candidate:CandidateInterface
}

function MessageButton({candidate}: Props) {

  const [showMessage,setShowMessage] = useState<boolean>(false)

  const { loading } = useAppSelector( state => state.pet)

  const { showButtonMessage } = useAppSelector( state => state.button)

  const { petDashboard } = useAppSelector(state => state.pet)

  const dispatch = useAppDispatch()

  function handleOpenMessage(){
    setShowMessage(true)
    dispatch(hideMessageButtonThunk())
  }

  return (
    <>  
        {showButtonMessage &&
          <>
            {!loading ? <button onClick={handleOpenMessage}>Message</button> : <button>Aguarde...</button> }
          </>
        }
        {showMessage && petDashboard &&
          <Message 
            name={candidate.name} 
            email={candidate.email} 
            profileImage={candidate.profileImage} 
            setShowMessage={setShowMessage}
            petName={petDashboard.name}
            />
            
        }
    </>
  )
}

export default MessageButton