import styles from './Pet.module.css'
import PetInterface from '../../interfaces/Pet'
import { Link } from 'react-router-dom'

type Props = {
  pet:PetInterface
}

function Pet({pet}: Props) {

  return (
    <div className={styles.petCard}>
      {typeof(pet.images[0].url) === 'string' && <img src={pet.images[0].url} alt={pet.name} />}
      <span>{pet.name}</span>
      <p className={styles.description}>{pet.description}</p>
      {!pet.available ? <Link to={`/pet/${pet._id}`}>Adotar</Link> : <p className={styles.adopted}>Adotado!</p>}
    </div>
  )
}

export default Pet