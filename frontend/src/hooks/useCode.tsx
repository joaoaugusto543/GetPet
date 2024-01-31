import { useEffect, useState } from 'react'

function useCode() {
  const [showFormCode,setShowFormCode]=useState<boolean>(false)

  useEffect(()=>{
    handleCloseEsc()
  },[showFormCode])

  function handleCloseEsc(){

    window.addEventListener('keydown',(e)=>{
        if(e.key === 'Escape'){

            if(!showFormCode){
                return
            }

            handleClose()

        }
    })

  }

  function handleClose(){
    setShowFormCode(false)
  }

  function handleOpen(){
    setShowFormCode(true)
  }

  return {handleClose,handleOpen,showFormCode}
}

export default useCode
