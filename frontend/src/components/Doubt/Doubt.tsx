import styles from './Doubt.module.css'

type Props={
    text:string
}

function Doubt({text}:Props) {
  return (
    <div className={styles.doubt}>
        <p>?</p>
        <div className={styles.box}>
            <p>{text}</p>
        </div>
    </div>
  )
}

export default Doubt
