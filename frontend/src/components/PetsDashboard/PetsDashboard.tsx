import useFetchPetsByUser from '../../hooks/useFetchPetsByUser'
import { useAppSelector } from '../../store'
import Empty from '../Empty/Empty'
import LoaderPetDashboard from '../Loaders/LoaderPetDashboard/LoaderPetDashboard'
import PetDashboard from '../PetDashboard/PetDashboard'

function PetsDashboard() {

  const {pets}=useFetchPetsByUser()

  const {loading} = useAppSelector(state => state.pet)

  return (
    <>
        {loading && <LoaderPetDashboard/>}
        {!loading && pets.length !== 0 && pets.map((pet)=><PetDashboard key={pet._id} pet={pet} />) }
        {!loading && pets.length === 0 && <Empty text='Você não possui pets para adotar'/>}
    </>
  )
}

export default PetsDashboard
