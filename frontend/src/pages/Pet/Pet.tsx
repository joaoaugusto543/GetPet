import SliderPet from '../../components/SliderPet/SliderPet'
import useFetchPet from '../../hooks/useFetchPet'
import { Params, useParams } from 'react-router-dom'
import styles from './Pet.module.css'
import { FaMapMarkerAlt , FaPhoneAlt , FaUser } from 'react-icons/fa'
import { IoChatboxEllipses } from 'react-icons/io5'
import { useState } from 'react'
import AdoptButton from '../../components/AdoptButton/AdoptButton'
import useVerifyPetPublic from '../../hooks/useVerifyPetPublic'
import { useAppSelector } from '../../store'
import Message from '../../components/Message/Message'
import useTitle from '../../hooks/useTitle'
import LoaderPage from '../../components/Loaders/LoaderPage/LoaderPage'
import useCloseNavBar from '../../hooks/useCloseNavBar'


function Pet() {

  const {id}:Readonly<Params<string>>=useParams()

  const { user } = useAppSelector((state)=> state.auth)

  const [showMessage,setShowMessage]=useState<boolean>(false)

  const {loading} = useAppSelector(state => state.pet)

  const pet = useFetchPet({id})

  useVerifyPetPublic()

  useCloseNavBar()

  useTitle({title:pet?.name})

  return (
    <section className={styles.petPage}>
        {pet && id &&
            <>
              <SliderPet id={id} imgs={pet.images} name={pet.name}/>
              <div className={styles.informations}>
                <h1>{pet.name}</h1>
                <p className={styles.description}>{pet.description}</p>
                <div className={styles.user}>
                  <img src={pet.user.profileImage} alt={pet.user.name} />
                  <div className={styles.userInformation}>
                    <p className={styles.name}><FaUser/>{pet.user.name}</p>
                    {pet.user.phone && <p><FaPhoneAlt/>{pet.user.phone}</p>}
                    <span className={styles.localization}><FaMapMarkerAlt/>{pet.user.city} - {pet.user.uf}</span>
                    {user && user.email !== pet.user.email &&
                      <>
                        {!showMessage && <button className={styles.chat} onClick={()=>{setShowMessage(true)}}><IoChatboxEllipses />Mensagem</button>}
                      </>
                    }
                  </div>
                </div>
                <div>
                  <p className={styles.alert}>Em caso de situações suspeitas, contate o suporte do GetPet. Agradecemos pela colaboração na construção de uma comunidade segura.</p>
                </div>
              </div>
              {showMessage && user && 
                <Message 
                  name={pet.user.name} 
                  email={pet.user.email} 
                  profileImage={pet.user.profileImage} 
                  setShowMessage={setShowMessage}
                  petName={pet.name}
                />
              }
              <AdoptButton/>
            </>
        }
        {loading && <LoaderPage/>}
    </section>
  )
}

export default Pet