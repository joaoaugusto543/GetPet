import { useEffect } from 'react'
import styles from './SliderPet.module.css'
import carrosel from '../../scripts/carrosel'
import { FaArrowAltCircleRight,FaArrowAltCircleLeft } from "react-icons/fa";
import ImagesPet from '../../interfaces/imagesPet';

type Props = {
    imgs:ImagesPet[]
    name:string
    id:string
}

function SliderPet({imgs,name,id}: Props) {

  useEffect(()=>{
    carrosel()
  },[id])

  return (
    <div id='carrosel' className={styles.carrosel}>
        {imgs.map((img)=><img key={img.position} src={img.url} alt={name}/>)}
        {imgs.length > 1 &&
            <div className={styles.controllers}>
              <FaArrowAltCircleLeft />
              <FaArrowAltCircleRight />
            </div>
        }
    </div>
  )
}

export default SliderPet