import React, { SetStateAction, useEffect } from 'react'
import { ErrorsUserInterface } from '../interfaces/ErrorsUserInterface'
import { useAppSelector } from '../store'

type Props={
    errosUserObject:ErrorsUserInterface,
    setErrosUserObject:React.Dispatch<SetStateAction<ErrorsUserInterface>>
}

function useFetchErrorsUser({errosUserObject,setErrosUserObject}:Props) {
  
    const { error } = useAppSelector(state => state.user)

    useEffect(()=>{
        if(error){
            verifyError(error)
        }
    },[error])

    function verifyError(error:String | string[]){

        if(!error){
            return
        }

        if(!Array.isArray(error)){
    
            if(error === 'User already exists'){
                setErrosUserObject({error:'Usuário já cadastrado'})
    
                setTimeout(()=>{
                    setErrosUserObject({})
                },3000)
    
                return errosUserObject
            }
     
        }

        if(error.includes('Name is required') || error.includes('Very long/small name')){
            setErrosUserObject((state:ErrorsUserInterface | undefined) => state = {...state,errorName:'Nome muito grande/pequeno'} )
        }
    
        if(error.includes('Email is required') || error.includes('Invalid email')){
            setErrosUserObject((state:ErrorsUserInterface | undefined) => state = {...state,errorEmail:'E-mail inválido'} )
        }
    
        if(error.includes('Password is required') || error.includes('Password too small')){
            setErrosUserObject((state:ErrorsUserInterface | undefined) => state = {...state,errorPassword:'Senha muito pequena'} )
        }
    
        if(error.includes('Confirm password is required') || error.includes('Passwords must be the same')){
            setErrosUserObject((state:ErrorsUserInterface | undefined) => state = {...state,errorConfirmPassword:'As senhas precisam ser iguais'} )
        }
    
        if(error.includes('Phone is required') || error.includes('Invalid phone')){
            setErrosUserObject((state:ErrorsUserInterface | undefined) => state = {...state,errorPhone:'Telefone inválido'} )
        }
    
        if(error.includes('Uf is required') || error.includes('Invalid uf')){
            setErrosUserObject((state:ErrorsUserInterface | undefined) => state = {...state,errorUf:'Uf inválido'} )
        }
    
        if(error.includes('City is required') || error.includes('Invalid city')){
            setErrosUserObject((state:ErrorsUserInterface | undefined) => state = {...state,errorCity:'Cidade inválida'} )
        }
    }
    


    return errosUserObject
}

export default useFetchErrorsUser
