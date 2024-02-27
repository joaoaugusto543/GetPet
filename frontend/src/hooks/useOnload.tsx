import React, { useCallback } from 'react'
import { image64toCanvasRef } from '../scripts/image64toCanvasRef'
import { Crop } from 'react-image-crop'
import { configImage } from '../scripts/configImage'

type Props={
    crop:Crop
}

function useOnload({crop}:Props) {

    const onLoadCrop = useCallback((e:React.BaseSyntheticEvent,imgRef:any,previewImage:File | string,previewRef:any) => {

        imgRef.current=e.target
    
        image64toCanvasRef(previewRef.current,imgRef.current,previewImage,crop)
    
    }, [crop])

    const onLoadImage = useCallback((e:React.BaseSyntheticEvent,imgRef:any,previewImage:File | string,previewRef:any,height:number,width:number)=>{

        imgRef.current=e.target
    
        configImage(previewRef.current,imgRef.current,previewImage,crop,height,width)

    },[])

    return {onLoadCrop,onLoadImage}
}

export default useOnload
