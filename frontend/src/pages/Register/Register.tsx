import RegisterForm from '../../components/RegisterForm/RegisterForm'
import styles from './Register.module.css'
import Dog from '../../imgs/dog.png'
import Cat from '../../imgs/cat.png'

function Register() {
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
