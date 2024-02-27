import { useParams } from 'react-router-dom'
import FormPet from '../../components/FormPet/FormPet'
import styles from './EditPet.module.css'

function EditPet() {

  const {id} = useParams()

  return (
    <section className={styles.createPet}>
        <h1>Editar Pet</h1>
        <FormPet id={id} type='edit'/>
        <img className={styles.dog} src='https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='cachorro' />
    </section>
  )
}

export default EditPet
