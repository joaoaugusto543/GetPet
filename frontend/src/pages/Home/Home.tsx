import LoaderPage from '../../components/Loaders/LoaderPage/LoaderPage'
import Pets from '../../components/Pets/Pets'
import useCloseNavBar from '../../hooks/useCloseNavBar'
import useTitle from '../../hooks/useTitle'
import { useAppSelector } from '../../store'

function Home() {

  useTitle({title:'GetPet'})

  useCloseNavBar()

  const { loading } = useAppSelector(state => state.auth)
  
  return (
    <div>
      {loading && <LoaderPage/>}
      <Pets/>
    </div>
  )
}

export default Home
