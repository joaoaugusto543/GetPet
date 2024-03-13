import PetInterface from '../../interfaces/Pet'
import styles from './MyPet.module.css'

type Props = {
    pet:PetInterface
}

function MyPet({pet}: Props) {

  return (
    <div className={styles.myPet}>
        <img src={pet.images[0].url} alt={pet.name} />
        <div className={styles.information}>
            <h2>{pet.name}</h2>
            <p>{pet.description}</p>
        </div>
    </div>
  )
}

export default MyPet