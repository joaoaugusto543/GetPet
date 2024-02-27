import useUpdatePosition from '../../hooks/useUpdatePosition'
import styles from './ImagePet.module.css'
import { FaTrashAlt } from 'react-icons/fa'

type Props={
    image:any,
    position:number,
    setImages:React.Dispatch<React.SetStateAction<any[]>>,
    images:any[],
}

function ImageCreatePet({image,position,setImages,images}:Props) {

  function deleteImage(){
    setImages((state:any[]) => state.filter((_image,index)=> index !== position))

    if(image.position){

        setImages((state:any[]) => state.map((img)=>{

          if(image.position === img.position){

              const newImage={
                ...img,
                position:'none'
              }

              return newImage
          }

          if(img.position > image.position){

              const newImage={
                ...img,
                position:img.position -1 
              }

              return newImage

          }

          return img

        }))

    }

    return
  }

  const updatePosition= useUpdatePosition({setImages,image,images})

  return (
    <div className={styles.divImage}>
      {image?.position &&
        <button onClick={updatePosition} className={styles.position}>
            <div className={styles.divPosition}>
                {image.position !== 'none' && <p>{image.position}</p>}
            </div>
        </button>
      }
      <img className={styles.image} src={image?.url ? image.url : URL.createObjectURL(image)}/>
      <div className={styles.before} onClick={deleteImage}>
        <FaTrashAlt/>
      </div>
    </div>
  )
}

export default ImageCreatePet
