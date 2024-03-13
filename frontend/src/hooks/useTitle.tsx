import { useEffect } from 'react'

type Props={
    title:string | undefined
}

function useTitle({title}:Props) {

  useEffect(()=>{
    if(title){
        document.title=title
        return
    }

    document.title='Aguarde...'
    
  },[title])

}

export default useTitle
