import React from 'react'

type Props={
    setCode:Function,
}

function useHandleCode({setCode}:Props) {

    function handleCode(e:React.BaseSyntheticEvent){

        const value= e.target.value
    
        if(value.length > 5){
          return
        }
    
        if(!Number.isInteger(parseInt(value)) && value){
          return
        }
    
        setCode(value)

    }

    return handleCode

}

export default useHandleCode
