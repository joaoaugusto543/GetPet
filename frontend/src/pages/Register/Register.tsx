import RegisterForm from '../../components/RegisterForm/RegisterForm'
import styles from './Register.module.css'
import Dog from '../../assets/dog.png'
import Cat from '../../assets/cat.png'
import useTitle from '../../hooks/useTitle'
import useCloseNavBar from '../../hooks/useCloseNavBar'

function Register() {

  useTitle({title:'Cadastro'})

  useCloseNavBar()

  return (
    <section className={styles.register}>
        <h1>Cadastro</h1>
        <RegisterForm/>
        <img className={styles.dog} src={Dog} alt='cachorro' />
        <img className={styles.cat} src={Cat} alt='gato' />
    </section>
  )
}

export default Register
