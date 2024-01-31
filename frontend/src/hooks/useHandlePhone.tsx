import React from 'react'

type Props={
    setPhone: React.Dispatch<React.SetStateAction<string>>,
    phone:string
}

function useHandlePhone({setPhone,phone}:Props) {
  
    function handlePhone(e:React.BaseSyntheticEvent){

        const value:string = e.target.value

        const phoneNumbers:string=value.replace('(','').replace(') ','').replace('-','')

        const regexNumbers=/^[0-9]+$/

        if(value.length < phone.length){
            setPhone(value)
            return
        }
        
        if(value.length > 14){
            return
        }

        if(!regexNumbers.test(phoneNumbers)){
            return
        }


        if(value.length === 2 && !value.includes('(') && !value.includes(')')){
            setPhone(`(${value}) `)
            return
        }

        if(value.includes(' ') && value.split(' ')[1].length===5){
            setPhone((state:string)=> `${state}-`)
            return
        }

        setPhone(value)
    }

    return handlePhone

}

export default useHandlePhone
