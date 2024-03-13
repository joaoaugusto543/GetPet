import PetDashboardInterface from '../../interfaces/PetDashboard'
import {Link} from 'react-router-dom'
import ButtonDeletePet from '../ButtonDeletePet/ButtonDeletePet'
import styles from './PetDashboard.module.css'

type Props={
    pet:PetDashboardInterface
}

function PetDashboard({pet}:Props) {

  return (
    <div className={styles.petDashboard}>
      <img src={pet.images[0].url} alt={pet.name} />
      <span>{pet.name}</span>
      <div className={styles.buttons}>
        <Link to={`/dashboard/pet/${pet._id}`}>Ver</Link>
        <Link to={`/edit-pet/${pet._id}`}>Editar</Link>
        <ButtonDeletePet id={pet._id}/>
      </div>
    </div>
  )
}

export default PetDashboard
