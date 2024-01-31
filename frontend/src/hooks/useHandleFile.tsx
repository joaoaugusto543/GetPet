import React from 'react'

type Props={
    setProfileImage:Function
}

function useHandleFile({setProfileImage}:Props) {

    function handleFile(e: React.BaseSyntheticEvent){

        const file: File=e.target.files[0]
        
        if(!file.type.includes('jpeg') && !file.type.includes('png') && !file.type.includes('jpg')){
            return
        }
    
        if(file){
            setProfileImage(file)
            return
        }
    
      }

      return handleFile
}

export default useHandleFile
