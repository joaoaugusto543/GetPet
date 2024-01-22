import styles from './NavBar.module.css'
import {Link, NavLink} from 'react-router-dom'
import Logo from '../../assets/logo.png'
import {User} from '../../data/User'
import ButtonLogout from '../ButtonLogout/ButtonLogout'
import { useEffect } from 'react'
import reduceNavBar from '../../scripts/reduceNavBar.js'

function NavBar() {

  const user=User[0]

  useEffect(()=>{
    reduceNavBar()
  },[])

  return (
    <header className={styles.header}>
      <nav id='navBar' className={styles.navBar}>
          <Link to='/'>
            <img src={Logo} alt='Logo' />
            <h1>GetPet</h1>
          </Link>
          <ul className={styles.navLinks}>
            <li><NavLink to='/dashboard'>Gerenciamento</NavLink></li>
            <li><NavLink to='/my-pets'>Meu Pets</NavLink></li>
            <li className={styles.profile}>
              <NavLink to='/profile'>
                <img className={styles.profileImage} src={user.image} alt={user.name} />
                <p>{user.name}</p>
              </NavLink>
            </li>
            <li>
              <ButtonLogout/>
            </li>
          </ul>
      </nav>
    </header>
  )
}

export default NavBar
