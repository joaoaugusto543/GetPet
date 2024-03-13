import { CandidateInterface } from '../../interfaces/CandidateInterface'
import { useAppSelector } from '../../store'
import AcceptButton from '../AcceptButton/AcceptButton'
import DeclineButton from '../DeclineButton/DeclineButton'
import MessageButton from '../MessageButton/MessageButton'
import styles from './Candidate.module.css'

type Props = {
    candidate: CandidateInterface,
}

function Candidate({candidate}: Props) {

  const {petDashboard} = useAppSelector(state => state.pet)

  return (
    <>
      {petDashboard && !candidate.rejected &&
        <div className={styles.candidate}>
            <img src={candidate.profileImage} alt={candidate.name} />
            <p>{candidate.name}</p>
            <div className={styles.buttons}>
                <AcceptButton idPet={petDashboard._id} idUser={candidate.id}/>
                <DeclineButton idPet={petDashboard._id} idUser={candidate.id}/>
                <MessageButton candidate={candidate}/>
            </div>
        </div>
      }
    </>
    
  )
}

export default Candidate