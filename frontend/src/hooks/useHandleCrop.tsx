type Props = {
    setImage:Function,
    setShowCrop:Function
}

function useHandleCrop({setImage,setShowCrop}: Props) {
  
    function handleOpenCrop(e:React.BaseSyntheticEvent){
        
        const file=e.target.files[0]

        if(!file.type.includes('jpeg') && !file.type.includes('png') && !file.type.includes('jpg')){
            return
        }
    
        if(file){
            setImage(file)
            setShowCrop(true)
            return
        }

        return
    }

    function handleCloseCrop(){
        setShowCrop(false)
        
    }

    return {handleOpenCrop,handleCloseCrop}
}

export default useHandleCrop