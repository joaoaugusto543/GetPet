import styles from './LoaderMyPet.module.css'

function LoaderMyPet() {
  return (
    <div className={styles.loader}>
        <div className={styles.img}></div>
        <div className={styles.name}></div>
    </div>
  )
}

export default LoaderMyPet
