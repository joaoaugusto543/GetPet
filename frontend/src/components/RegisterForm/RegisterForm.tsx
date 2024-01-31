import { useEffect, useState } from 'react'
import SelectUfs from '../SelectUfs/SelectUfs'
import styles from './RegisterForm.module.css'
import SelectCities from '../SelectCities/SelectCities'
import useHandleFile from '../../hooks/useHandleFile'
import useHandlePhone from '../../hooks/useHandlePhone'
import { createUserThunk } from '../../slices/userSlices'
import { useAppDispatch, useAppSelector } from '../../store'
import NewUserRegister from '../../interfaces/newUserRegister'
import useCode from '../../hooks/useCode'
import Code from '../Code/Code'

function RegisterForm() {

    
    const [name,setName]=useState<string>('')
    const [email,setEmail]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const [confirmPassword,setConfirmPassword]=useState<string>('')
    const [uf,setUf]=useState<string>('')
    const [city,setCity]=useState<string>('')
    const [profileImage,setProfileImage]=useState<File | null>(null)
    const [phone,setPhone]=useState<string>('')
    
    const handleFile=useHandleFile({setProfileImage})
    const handlePhone=useHandlePhone({setPhone,phone})
    
    const {showFormCode,handleOpen,handleClose}=useCode()
    
    const dispatch=useAppDispatch()
    
    const {loading,success}=useAppSelector(state => state.user)
    
    useEffect(()=>{
      if(success){
        handleOpen()
      }
    },[success])

  function handleSubmit(e:React.SyntheticEvent<HTMLFormElement>){
    e.preventDefault()

    if(loading){
        return
    }

    const newUser:NewUserRegister={
        name,
        email,
        password,
        confirmPassword,
        uf,
        city
    }

    if(profileImage){
        newUser.profileImage=profileImage
    }

    if(phone){
        newUser.phone=phone
    }

    dispatch(createUserThunk(newUser))
  }  


  return (
    <>
        {showFormCode && <Code email={email} password={password} handleClose={handleClose}/>}
        {profileImage && <img className={styles.preview} src={URL.createObjectURL(profileImage)} alt={profileImage.name} />}
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            {!profileImage ?
                <label id={styles.file} className={styles.file}>
                    <input type='file' accept='.png , .jpeg , .jpg' value={profileImage ? profileImage : ''}  onChange={handleFile}/>
                    <img className={styles.anonymous} src='https://res.cloudinary.com/dezsbjgjj/image/upload/v1706144110/p6uv3s57jyfatagksntg.png' alt='anônimo'/>
                    <span>Adicione uma foto (opcional)</span>
                </label>
                :
                <label id={styles.updateFile}>
                    <input type='file' accept='.png , .jpeg , .jpg'  onChange={handleFile}/>
                    <span>Alterar foto</span>
                </label>
            }

            <label>
                <span>Nome:</span>
                <input type='text' placeholder='Digite seu nome' value={name} onChange={(e)=>setName(e.target.value)} />
            </label>
            <label>
                <span>E-mail:</span>
                <input type='email' placeholder='Digite seu e-mail' value={email} onChange={(e)=>setEmail(e.target.value)} />
            </label> 
            <label>
                <span>Telefone:</span>
                <input type='text' placeholder='Digite seu telefone(opcional)' value={phone} onChange={handlePhone} />
            </label>
            <label>
                <span>Uf:</span>
                <SelectUfs uf={uf} setUf={setUf}/>
            </label> 
            <label>
                <span>Cidade</span>
                <SelectCities city={city} setCity={setCity} uf={uf}/>
            </label>
            <label>
                <span>Senha:</span>
                <input type='password' placeholder='Digite sua senha' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </label>
            <label>
                <span>Confirme sua senha:</span>
                <input type='password' placeholder='Confirme sua senha' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
            </label>
            {!loading ? <input type='submit' value='Cadastrar'/> : <input type='submit' disabled value='Aguarde...'/>}
        </form>
    </>
  )
}

export default RegisterForm
