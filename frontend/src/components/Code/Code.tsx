import { SyntheticEvent, useState } from 'react'
import { login } from '../../slices/authSlices'
import { useAppDispatch, useAppSelector } from '../../store'
import styles from './Code.module.css'
import useHandleCode from '../../hooks/useHandleCode'
import { IoMdCloseCircle } from 'react-icons/io'

type Props={
    email:string,
    password:string,
    handleClose:Function
}

function Code({email,password,handleClose}:Props) {

  const [code,setCode]=useState<string>('')
  const {loading} = useAppSelector(state => state.auth)
  const dispatch=useAppDispatch()

  const handleCode = useHandleCode({setCode})

  function handleSubmit(e:SyntheticEvent<HTMLFormElement>){
    e.preventDefault()

    const loginData={
        email,
        password,
        code
    }

    dispatch(login(loginData))

  }

  return (
    <section className={styles.code}>
        <div className={styles.boxCode}>  
            <p>Enviamos um código de verificação de cinco digítos para o e-mail {email}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Código:</span>
                    <input type='text' placeholder='Digite o código de verificação' maxLength={5} value={code} onChange={handleCode}/>
                </label>
                {!loading ? <input type='submit' value='Enviar' /> : <input type='submit' disabled value='Aguarde...' />}
            </form>
        </div>
        <button onClick={()=>handleClose()}>
          <IoMdCloseCircle/>
        </button>
    </section>
  )
}

export default Code
