import {MouseEventHandler, useRef, useState } from 'react'
import ReactCrop,{Crop} from 'react-image-crop'
import styles from './ImageCrop.module.css'
import  'react-image-crop/dist/ReactCrop.css' 
import useHandleOnCropComplete from '../../hooks/useHandleOnCropComplete'
import useOnload from '../../hooks/useOnload'
import useAddImage from '../../hooks/useAddImage'

type Props={
    image:File,
    handleClose:MouseEventHandler,
    setImages:React.Dispatch<React.SetStateAction<any[]>>,
    type:string
}

function ImageCrop({image,handleClose,setImages,type}:Props) {

  const [crop,setCrop]=useState<Crop>({unit:'px',x:0,y:0,width:400,height:400})
  
  const previewImageRef=useRef<HTMLCanvasElement>(null)
  
  const imageRef=useRef<any>(null)

  const handleOnCropComplete=useHandleOnCropComplete({imageRef,previewImageRef,previewImage:image})

  const {onLoadCrop} = useOnload({crop})

  const handleAddImage = useAddImage({setImages,handleClose,type})

  return (
    <div className={styles.crop}>
      <div className={styles.box}>
        <h1>Editar imagem</h1>
        <div className={styles.imageCrop}>
          <div className={styles.divPreview}>
            <canvas className={styles.previewImage} ref={previewImageRef}/>
          </div>
          <ReactCrop aspect={1} locked crop={crop} ruleOfThirds onChange={(e)=>setCrop(e)} onComplete={handleOnCropComplete}>
              <img onLoad={(e)=>onLoadCrop(e,imageRef,image,previewImageRef)} className={styles.image} src={URL.createObjectURL(image)} ref={imageRef} alt='crop' />
          </ReactCrop>
        </div>
        <div className={styles.commands}>
            <button onClick={handleClose}>Cancelar</button>
            <button onClick={()=>handleAddImage(previewImageRef.current)}>Editar</button>
        </div>
      </div>
    </div>
  )
}

export default ImageCrop
