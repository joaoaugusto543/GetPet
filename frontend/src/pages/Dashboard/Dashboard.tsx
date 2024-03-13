import { Link } from 'react-router-dom'
import PetsDashboard from '../../components/PetsDashboard/PetsDashboard'
import styles from './Dashboard.module.css'
import { IoMdAddCircle } from 'react-icons/io'
import useTitle from '../../hooks/useTitle'
import useCloseNavBar from '../../hooks/useCloseNavBar'

function Dashboard() {

  useTitle({title:'Gerenciamento'})

  useCloseNavBar()

  return (
    <section className={styles.dashboard}>
        <div className={styles.link}>
          <Link to='/create-pet'><IoMdAddCircle />Adicionar pet</Link>
        </div>
        <PetsDashboard/>
    </section>
  )
}

export default Dashboard
