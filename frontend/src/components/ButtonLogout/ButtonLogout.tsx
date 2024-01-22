import styles from './ButtonLogout.module.css'
import { IoIosLogOut } from 'react-icons/io'


function ButtonLogout() {

  function handleLogout(){
    console.log('logout')
  }

  return (
    <button className={styles.logout} onClick={handleLogout}>Sair<IoIosLogOut/></button>
  )
}

export default ButtonLogout
