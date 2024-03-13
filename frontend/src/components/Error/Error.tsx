import styles from './Error.module.css'

type Props = {
    error:string | undefined
}

function Error({error}: Props) {
  return (
    <>
        {error && <p className={styles.error}>{error}</p>}
    </>
  )
}

export default Error