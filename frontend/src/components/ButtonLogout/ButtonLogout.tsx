import { clear as clearAuth, logout } from '../../slices/authSlices'
import { clear as clearPets } from '../../slices/petsSlices'
import { clear as clearUser} from '../../slices/userSlices'
import { useAppDispatch } from '../../store'
import styles from './ButtonLogout.module.css'
import { IoIosLogOut } from 'react-icons/io'


function ButtonLogout() {

  const dispatch=useAppDispatch()

  function handleLogout(){
    dispatch(clearPets())
    dispatch(clearUser())
    dispatch(clearAuth())
    dispatch(logout())
  }

  return (
    <button className={styles.logout} onClick={handleLogout}>Sair<IoIosLogOut/></button>
  )
}

export default ButtonLogout
