import { SyntheticEvent, useEffect, useState } from 'react'
import styles from './LoginForm.module.css'
import { useAppDispatch, useAppSelector } from '../../store'
import {login} from '../../slices/authSlices'
import Code from '../Code/Code'
import useCode from '../../hooks/useCode'

function LoginForm() {

  const [email,setEmail]=useState<string>('')
  const [password,setPassword]=useState<string>('')

  const [errorLogin,setErrorLogin] = useState('')

  const {error,loading}=useAppSelector(state => state.auth)
  const {handleOpen,showFormCode,handleClose}=useCode()
  const dispatch=useAppDispatch()

  useEffect(()=>{
    if(error === 'Invalid code'){
      handleOpen()
    }

    if(error === 'User not found' || error=='Incorrect password/email'){
      setErrorLogin('Falha no login')

      setTimeout(() => {
        setErrorLogin('')
      }, 3000)

    }
  },[error])


  function handleSubmit(e:SyntheticEvent<HTMLFormElement>){
      e.preventDefault()

      if(loading){
        return
      }

      const loginData={
        email,
        password
      }

      dispatch(login(loginData))
  }

  return (
    <>
      {showFormCode && <Code password={password} email={email} handleClose={handleClose}/>}
      {errorLogin && <p className={styles.errorLogin}>{errorLogin}</p>}
      <form className={styles.loginForm} onSubmit={handleSubmit}>
          <label>
              <span>E-mail</span>
              <input type='email' placeholder='Digite seu e-mail' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </label>
          <label>
              <span>Senha</span>
              <input type='password' placeholder='Digite sua senha' value={password} onChange={(e)=> setPassword(e.target.value)}/>
          </label>
          {!loading ? <input type='submit' value='Entrar' /> : <input type='submit' value='Aguarde...' />}
      </form>
    </>
  )
}

export default LoginForm
