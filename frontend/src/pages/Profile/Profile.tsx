import FormEditUser from '../../components/FormEditUser/FormEditUser'
import useCloseNavBar from '../../hooks/useCloseNavBar'
import useTitle from '../../hooks/useTitle'
import styles from './Profile.module.css'

function Profile() {

  useTitle({title:'Perfil'})

  useCloseNavBar()

  return (
    <section className={styles.pet}>
        <FormEditUser/>
        <img className={styles.image} src='https://cdn.pixabay.com/photo/2017/12/27/14/02/friends-3042751_1280.jpg' alt='pet e sua dona' />
    </section>
  )
}

export default Profile
