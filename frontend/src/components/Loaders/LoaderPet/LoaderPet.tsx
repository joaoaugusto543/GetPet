import styles from './LoaderPet.module.css'

function LoaderPet() {
  return (
    <div className={styles.loaderPet}>
      <div className={styles.divImage}></div>
      <div className={styles.divButton}></div>
    </div>
  )
}

export default LoaderPet
