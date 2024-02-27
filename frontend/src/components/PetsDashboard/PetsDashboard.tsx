import useFetchPetsByUser from '../../hooks/useFetchPetsByUser'
import { useAppSelector } from '../../store'
import LoaderPetDashboard from '../Loaders/LoaderPetDashboard/LoaderPetDashboard'
import PetDashboard from '../PetDashboard/PetDashboard'

function PetsDashboard() {

  const {pets}=useFetchPetsByUser()

  const {loading} = useAppSelector(state => state.pet)

  return (
    <>
        {loading && <LoaderPetDashboard/>}
        {!loading && pets && pets.map((pet)=><PetDashboard key={pet._id} pet={pet} />) }
    </>
  )
}

export default PetsDashboard
