import React, { SetStateAction, useEffect } from 'react'
import { useAppSelector } from '../store'
import { ErrorsPetInterface } from '../interfaces/ErrorsPetInterface'

type Props={
    errosPetObject:ErrorsPetInterface,
    setErrosPetObject:React.Dispatch<SetStateAction<ErrorsPetInterface>>
}

function useFetchErrorsPet({errosPetObject,setErrosPetObject}:Props) {
  
    const { error } = useAppSelector(state => state.pet)

    useEffect(()=>{
        if(error && (typeof(error) === 'string' || Array.isArray(error))){            
            verifyError(error)
        }
    },[error])

    function verifyError(error:String | string[]){

        if(!error){
            return
        }

        if(!Array.isArray(error)){
    
            if(error === 'Image is required'){
                setErrosPetObject({error:'Insira pelo menos uma imagem'})
        
                return errosPetObject
            }
     
        }

        if(error.includes('Name is required') || error.includes('Very long/small name')){
            setErrosPetObject((state:ErrorsPetInterface | undefined) => state = {...state,errorName:'Nome muito grande/pequeno'} )
        }
    
        if(error.includes('Size is required') || error.includes('Invalid size')){
            setErrosPetObject((state:ErrorsPetInterface | undefined) => state = {...state,errorSize:'Tamanho inválido'} )
        }
    
        if(error.includes('Invalid specie')){
            setErrosPetObject((state:ErrorsPetInterface | undefined) => state = {...state,errorSpecies:'Espécie inválida'} )
        }
    
        if(error.includes('Invalid description') || error.includes('Description too small')){
            setErrosPetObject((state:ErrorsPetInterface | undefined) => state = {...state,errorDescription:'Descrição muito pequena'} )
        }
    
        
    }
    


    return errosPetObject
}

export default useFetchErrorsPet
