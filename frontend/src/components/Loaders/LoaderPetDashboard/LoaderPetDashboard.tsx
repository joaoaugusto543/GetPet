import styles from './LoaderPetDashboard.module.css'

function LoaderPetDashboard() {
  return (
    <div className={styles.loader}>
        <div className={styles.img}></div>
        <div className={styles.name}></div>
        <div className={styles.buttons}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default LoaderPetDashboard
