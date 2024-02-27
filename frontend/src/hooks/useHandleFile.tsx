import React from 'react'

type Props={
    set:Function
}

function useHandleFile({set}:Props) {

    function handleFile(e: React.BaseSyntheticEvent){

        const file: File=e.target.files[0]
        
        if(!file.type.includes('jpeg') && !file.type.includes('png') && !file.type.includes('jpg')){
            return
        }
    
        if(file){
 
            set(file)
            return
        }
    
      }

      return handleFile
}

export default useHandleFile
