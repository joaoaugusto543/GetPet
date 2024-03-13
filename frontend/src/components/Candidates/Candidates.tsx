import { CandidateInterface } from '../../interfaces/CandidateInterface'
import Candidate from '../Candidate/Candidate'
import styles from './Candidates.module.css'

type Props={
    candidates: CandidateInterface[]
}

function Candidates({candidates}:Props) {

  return (
    <div className={styles.candidates}>
        {candidates.length !== 0 && candidates.map((candidate)=><Candidate key={candidate.id} candidate={candidate}/>)}
    </div>
  )
}

export default Candidates
