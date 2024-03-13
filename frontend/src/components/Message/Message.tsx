import React, { SetStateAction, useEffect, useState } from 'react'
import styles from './Message.module.css'
import { IoMdSend } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from '../../store'
import { showButtonMessageThunk } from '../../slices/buttonSlices'
import { MessageInterface } from '../../interfaces/MessageInterface'
import { resetSuccess, sendMessageThunk } from '../../slices/userSlices'
import LoaderAddImage from '../Loaders/LoaderAddImage/LoaderAddImage'

type Props={
    email:string | undefined,
    profileImage:string | undefined,
    name:string | undefined,
    setShowMessage: React.Dispatch<SetStateAction<boolean>>,
    petName:string
}

function Message({email,name,profileImage,petName,setShowMessage}:Props) {

  const dispatch = useAppDispatch()

  const [message,setMessage]=useState<string>('')

  const { token } = useAppSelector(state => state.auth)

  const { success,loading } = useAppSelector(state => state.user)

  useEffect(()=>{
    if(success){
      handleCloseMessage()
      dispatch(resetSuccess())
    }
  },[success])

  function handleCloseMessage(){
    setShowMessage(false)
    dispatch(showButtonMessageThunk())
  }

  function handleSubmit(e:React.BaseSyntheticEvent){

    e.preventDefault()

    if(!email || !token || !petName || !profileImage || !name){
      return
    }

    const messageData:MessageInterface={
      email: email,
      petName: petName,
      message
    }

    dispatch(sendMessageThunk({token,message:messageData}))

  }
 
  return (
    <>
        {name && profileImage && email &&
            <div className={styles.message}>
                <div className={styles.user}>
                    <img src={profileImage} alt={name} />
                    <p>{name}</p>
                </div>
                <form className={styles.formMessage}>
                    <textarea placeholder='Digite sua mensagem' onChange={(e)=>setMessage(e.target.value)}/>
                    {!loading ? <button onClick={handleSubmit}><IoMdSend /></button> : <button><LoaderAddImage/></button>}
                </form>
                <button className={styles.close} onClick={handleCloseMessage}>x</button>
            </div>

        }
    </>
  )
}

export default Message