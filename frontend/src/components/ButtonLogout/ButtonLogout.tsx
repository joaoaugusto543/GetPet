import { logout } from '../../slices/authSlices'
import { useAppDispatch } from '../../store'
import styles from './ButtonLogout.module.css'
import { IoIosLogOut } from 'react-icons/io'


function ButtonLogout() {

  const dispatch=useAppDispatch()

  function handleLogout(){
    dispatch(logout())
  }

  return (
    <button className={styles.logout} onClick={handleLogout}>Sair<IoIosLogOut/></button>
  )
}

export default ButtonLogout
