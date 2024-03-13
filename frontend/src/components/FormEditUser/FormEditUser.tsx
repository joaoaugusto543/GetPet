import React, { useEffect, useState } from 'react'
import SelectUfs from '../SelectUfs/SelectUfs'
import SelectCities from '../SelectCities/SelectCities'
import styles from './FormEditUser.module.css'
import { useAppDispatch, useAppSelector } from '../../store'
import useHandleFile from '../../hooks/useHandleFile'
import useHandlePhone from '../../hooks/useHandlePhone'
import { resetError, updateUserThunk } from '../../slices/userSlices'
import DataUpdateUser from '../../interfaces/DataUpdateUser'
import useFetchErrorsUser from '../../hooks/useFetchErrorsUser'
import Error from '../Error/Error'
import { ErrorsUserInterface } from '../../interfaces/ErrorsUserInterface'

function FormEditUser() {

  const [name,setName]=useState<string>('')
  const [email,setEmail]=useState<string>('')
  const [uf,setUf]=useState<string>('')
  const [city,setCity]=useState<string>('')
  const [profileImage,setProfileImage]=useState<File | null>(null)
  const [phone,setPhone]=useState<string>('')

  const {loading,user} = useAppSelector(state => state.user)

  const {token} = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()

  const [errosUserObject,setErrosUserObject] = useState<ErrorsUserInterface>({})
 
  const {errorCity,errorEmail,errorName,errorPhone,errorUf} = useFetchErrorsUser({errosUserObject,setErrosUserObject})

  useEffect(()=>{
    if(!user){
        return
    }
   
    dispatch(resetError())
    setErrosUserObject({})

    setName(user.name)
    setEmail(user.email)
    setUf(user.uf)
    setCity(user.city)

    if(user?.phone){
        setPhone(user.phone)
    }

  },[user])

  const handleFile = useHandleFile({set:setProfileImage})

  const handlePhone = useHandlePhone({setPhone,phone})

  function handleSubmit(e:React.BaseSyntheticEvent){
    e.preventDefault()

    if(!token){
        return
    }

    const userUpdated:DataUpdateUser={
        name,
        uf,
        city
    }

    if(profileImage){
        userUpdated.profileImage=profileImage
    }

    if(phone){
        userUpdated.phone=phone
    }

    dispatch(updateUserThunk({token,userUpdated}))
  }

  return (
    <div className={styles.divForm}>
        {user && typeof(user.profileImage) === 'string' && 
            <img className={styles.preview} src={profileImage ? URL.createObjectURL(profileImage) : user.profileImage} alt={user.name} />
        }
        <form className={styles.registerEditUser} onSubmit={handleSubmit}>
            <label id={styles.updateFile}>
                <input type='file' accept='.png , .jpeg , .jpg' value={profileImage ? profileImage.webkitRelativePath : ''}  onChange={handleFile}/>
                <span>Alterar foto</span>
            </label>
            <label>
                <span>Nome:</span>
                <input type='text' placeholder='Digite seu nome' value={name} onChange={(e)=>setName(e.target.value)} />
                <Error error={errorName}/>
            </label>
            <label>
                <span>E-mail:</span>
                <input type='email' disabled placeholder='Digite seu e-mail' value={email} />
                <Error error={errorEmail}/>
            </label> 
            <label>
                <span>Telefone:</span>
                <input type='text' placeholder='Digite seu telefone(opcional)' value={phone} onChange={handlePhone} />
                <Error error={errorPhone}/>
            </label>
            <label>
                <span>Uf:</span>
                <SelectUfs uf={uf} setUf={setUf}/>
                <Error error={errorUf}/>
            </label> 
            <label>
                <span>Cidade</span>
                <SelectCities city={city} setCity={setCity} uf={uf}/>
                <Error error={errorCity}/>
            </label>
            {!loading ? <input type='submit' value='Editar'/> : <input type='submit' disabled value='Aguarde...'/>}
        </form>
    </div>
  )
}

export default FormEditUser
