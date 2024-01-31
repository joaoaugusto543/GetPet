import LoginForm from '../../components/LoginForm/LoginForm'
import styles from './Login.module.css'
import CatLogin from '../../imgs/catLogin.png'

function Login() {
  return (
    <section className={styles.login}>
      <h1>Login</h1>
      <LoginForm/>
      <img className={styles.cat} src={CatLogin} alt='gato' />
    </section>
  )
}

export default Login
