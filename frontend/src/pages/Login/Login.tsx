import LoginForm from '../../components/LoginForm/LoginForm'
import styles from './Login.module.css'
import CatLogin from '../../assets/catLogin.png'
import useTitle from '../../hooks/useTitle'
import useCloseNavBar from '../../hooks/useCloseNavBar'

function Login() {

  useTitle({title:'Login'})

  useCloseNavBar()

  return (
    <section className={styles.login}>
      <h1>Login</h1>
      <LoginForm/>
      <img className={styles.cat} src={CatLogin} alt='gato' />
    </section>
  )
}

export default Login
