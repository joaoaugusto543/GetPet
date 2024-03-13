import MyPets from '../../components/MyPets/MyPets'
import useCloseNavBar from '../../hooks/useCloseNavBar'
import useTitle from '../../hooks/useTitle'
import styles from './MyPetsPage.module.css'

function MyPetsPage() {

  useTitle({title:'Meus pets'})

  useCloseNavBar()

  return (
    <section className={styles.myPetsPage}>
        <h1>Meus Pets</h1>
        <MyPets/>
    </section>
  )
}

export default MyPetsPage
