import DogLoader from '../../../assets/dogLoader.png'
import styles from './LoaderPage.module.css'

function LoaderPage() {
  return (
    <section className={styles.loaderPage}>
        <div className={styles.loader}>
            <img src={DogLoader} alt='cachorro' />
            <div className={styles.bar}>
                <div></div>
            </div>
            <div className={styles.divText}>
                <p className={styles.text}>Carregando...</p>
            </div>
        </div>
    </section>
  )
}

export default LoaderPage
