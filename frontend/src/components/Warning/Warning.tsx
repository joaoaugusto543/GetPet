import React from 'react'
import styles from './Warning.module.css'

type Props = {
    text:string,
    setShow:React.Dispatch<React.SetStateAction<boolean>>,
    action: Function
}

function Warning({text,setShow,action}: Props) {

  function handleClose(){
    setShow(false)
  }

  function handleAction(){
    action()
    handleClose()
  }

  return (
    <section className={styles.warning}>
        <div className={styles.box}>
            <p>{text}</p>
            <div className={styles.buttons}>
              <button onClick={handleAction}>Sim</button>
              <button onClick={handleClose}>Não</button>
            </div>
        </div>
    </section>
  )
}

export default Warning