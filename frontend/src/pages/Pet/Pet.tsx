import SliderPet from '../../components/SliderPet/SliderPet'
import useFetchPet from '../../hooks/useFetchPet'
import { Params, useParams } from 'react-router-dom'
import styles from './Pet.module.css'
import { FaMapMarkerAlt , FaPhoneAlt , FaUser } from 'react-icons/fa'
import { IoChatboxEllipses } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { useState } from 'react'

function Pet() {

  const {id}:Readonly<Params<string>>=useParams()

  const [showChat,setShowChat]=useState<boolean>(false)

  const pet = useFetchPet({id})
 
  return (
    <section className={styles.petPage}>
        {pet &&
            <>
              <SliderPet imgs={pet.images} name={pet.name}/>
              <div className={styles.informations}>
                <h1>{pet.name}</h1>
                <p className={styles.description}>{pet.description}</p>
                <div className={styles.user}>
                  <img src={pet.user.image} alt={pet.user.name} />
                  <div className={styles.userInformation}>
                    <p className={styles.name}><FaUser/>{pet.user.name}</p>
                    <p className={styles.email}><MdEmail/>{pet.user.email}</p>
                    {!showChat && <button className={styles.chat} onClick={()=>{setShowChat(true)}}><IoChatboxEllipses />Bate-papo</button>}
                    <p><FaPhoneAlt/>{pet.user.phone}</p>
                    <p><FaMapMarkerAlt/>{pet.user.city} - {pet.user.uf}</p>
                  </div>
                </div>
                <div>
                  <p className={styles.alert}>Em caso de situações suspeitas, contate o suporte do GetPet. Agradecemos pela colaboração na construção de uma comunidade segura.</p>
                </div>
              </div>
            </>
        }
    </section>
  )
}

export default Pet