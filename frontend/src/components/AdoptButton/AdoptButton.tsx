import { addCandidatesThunk } from '../../slices/petsSlices'
import { useAppDispatch, useAppSelector } from '../../store'
import styles from './AdoptButton.module.css'

function AdoptButton() {

  const {pet,loading} = useAppSelector(state => state.pet)

  const {token} = useAppSelector(state => state.auth)

  const {user} = useAppSelector(state => state.user)

  const dispatch= useAppDispatch()

  function handleAddCandidate(){

     if(!pet || !token){
        return
     }

     dispatch(addCandidatesThunk({id:pet?._id,token}))
  }

  const candidate= pet?.candidates.find((candidate)=> candidate.id === user?._id )

  return (
    <>
        {pet && user && pet.user.id !== user._id && !pet.available &&
            <>
                {!loading && !candidate &&
                    <button className={styles.button} onClick={handleAddCandidate}>Adotar</button>
                }
                {loading && !candidate &&
                    <button disabled className={styles.loading}>Aguarde...</button>
                }
                {candidate && !candidate.rejected &&
                    <p className={styles.text}>Aguarde o dono aceitar seu pedido...</p>
                }
                {candidate && candidate.rejected &&
                    <p className={styles.reject}>Pedido recusado :(</p>
                }
            </>    
        }
    </>
  )
}

export default AdoptButton
