import styles from './NavBar.module.css'
import {Link, NavLink} from 'react-router-dom'
import Logo from '../../assets/logo.png'
import ButtonLogout from '../ButtonLogout/ButtonLogout'
import { useEffect } from 'react'
import reduceNavBar from '../../scripts/reduceNavBar.js'
import useFetchUser from '../../hooks/useFetchUser.js'
import { useAppDispatch, useAppSelector } from '../../store.js'
import LoaderPage from '../Loaders/LoaderPage/LoaderPage.js'
import { TiThMenu } from 'react-icons/ti'
import openNavBar from '../../scripts/openNavBar.js'
import closeNavBar from '../../scripts/closeNavBar.js'
import screenSize from '../../scripts/ScreenSize.js'
import { hideNavBarThunk, showNavBarThunk } from '../../slices/buttonSlices.js'

function NavBar() {

  const user=useFetchUser()

  const { loading } = useAppSelector(state => state.user)

  const {showNavBar} = useAppSelector(state => state.button)

  const dispatch = useAppDispatch()

  useEffect(()=>{
    reduceNavBar()
    screenSize()
  },[])

  function handleOpenNavBar(){
    openNavBar()
    dispatch(showNavBarThunk())
  }

  function handleCloseNavBar(){
    closeNavBar()
    dispatch(hideNavBarThunk())
  }


  return (
    <header className={styles.header}>
      {loading && <LoaderPage/>}
      <button onClick={!showNavBar ? handleOpenNavBar : handleCloseNavBar} className={styles.buttonNavBar}><TiThMenu /></button>
      <nav id='navBar' className={styles.navBar}>
          <Link to='/'>
            <img src={Logo} alt='Logo' />
            <h1>GetPet</h1>
          </Link>
          <ul className={styles.navLinks}>
            <li><NavLink to='/'>Pets</NavLink></li>
            {user &&
              <>
                  <li><NavLink to='/my-pets'>Meu Pets</NavLink></li>
                  <li><NavLink to='/dashboard'>Gerenciamento</NavLink></li>
                  <li className={styles.profile}>
                    <NavLink to='/profile'>
                      <img className={styles.profileImage} src={typeof(user?.profileImage) === 'string' ? user.profileImage : ''} alt={user?.name} />
                      <p>{user?.name ? user?.name : ''}</p>
                    </NavLink>
                  </li>
                  <li>
                    <ButtonLogout/>
                  </li>
              </>
            }
            {!user &&
              <>
                <li><NavLink to='/register'>Cadastro</NavLink></li>
                <li><NavLink to='/login'>Login</NavLink></li>
              </>
            }
          </ul>
      </nav>
    </header>
  )
}

export default NavBar
