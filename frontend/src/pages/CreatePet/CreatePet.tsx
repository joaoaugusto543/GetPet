import FormPet from '../../components/FormPet/FormPet'
import useCloseNavBar from '../../hooks/useCloseNavBar'
import useTitle from '../../hooks/useTitle'
import styles from './CreatePet.module.css'

function CreatePet() {

  useTitle({title:'Criar Pet'})

  useCloseNavBar()

  return (
    <section className={styles.createPet}>
        <h1>Criar Pet</h1>
        <FormPet id={undefined} type='create'/>
        <img className={styles.dog} src='https://cdn.pixabay.com/photo/2020/06/30/22/34/dog-5357794_1280.jpg' alt='cachorro' />
    </section>
  )
}

export default CreatePet
