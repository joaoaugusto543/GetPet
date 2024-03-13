import styles from './Empty.module.css'
import DogOne from '../../assets/dogOne.png'

type Props={
    text:string
}

function Empty({text}:Props) {
  return (
    <div className={styles.empty}>
      <img src={DogOne} alt='cachorro' />
      <p>{text}</p>
    </div>
  )
}

export default Empty
