import { useEffect } from 'react'
import styles from './SliderPet.module.css'
import carrosel from '../../scripts/carrosel'
import { FaArrowAltCircleRight,FaArrowAltCircleLeft } from "react-icons/fa";

type Props = {
    imgs:string[]
    name:string
}

function SliderPet({imgs,name}: Props) {

  useEffect(()=>{
    carrosel()
  },[])

  return (
    <div id='carrosel' className={styles.carrosel}>
        {imgs.map((img)=><img key={img} src={img} alt={name}/>)}
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