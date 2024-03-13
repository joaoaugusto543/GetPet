import { useParams } from 'react-router-dom'
import SliderPet from '../../components/SliderPet/SliderPet'
import styles from './PetDashboard.module.css'
import Candidates from '../../components/Candidates/Candidates'
import useFetchPetDashboard from '../../hooks/useFetchPetDashboard'
import useVerifyPet from '../../hooks/useVerifyPet'
import useTitle from '../../hooks/useTitle'
import { useAppSelector } from '../../store'
import LoaderPage from '../../components/Loaders/LoaderPage/LoaderPage'
import useCloseNavBar from '../../hooks/useCloseNavBar'

function PetDashboard() {

  const {id} = useParams()

  const pet = useFetchPetDashboard({id})

  const { loading } = useAppSelector(state => state.pet)

  useVerifyPet({id})

  useCloseNavBar()

  useTitle({title:pet?.name})

  return (
    <section className={styles.petDashboard}>
        {loading && <LoaderPage/>}
        {pet &&
          <>
            <SliderPet id={pet._id} imgs={pet.images} name={pet.name}/>
            <div className={styles.informations}>
              <h1>{pet.name}</h1>
              <p className={styles.description}>{pet.description}</p>
            </div>
            <h2 className={styles.candidateTitle}>Candidatos:</h2>
            <Candidates candidates={pet.candidates}/>
          </>
        }
    </section>
  )
}

export default PetDashboard
