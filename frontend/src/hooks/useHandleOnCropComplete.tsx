import { image64toCanvasRef } from '../scripts/image64toCanvasRef'
import { Crop } from 'react-image-crop'


interface Props{
    previewImageRef:any,
    imageRef:any,
    previewImage:File | string
}

function useImageCrop({previewImageRef,imageRef,previewImage}:Props) {

    function handleOnCropComplete(crop:Crop){

        if(!imageRef || !previewImageRef){
            return
        }

        const previewRef= previewImageRef.current
        const imgRef= imageRef.current

        image64toCanvasRef(previewRef,imgRef,previewImage,crop)

        return
    }


    return handleOnCropComplete
}

export default useImageCrop
