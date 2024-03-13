import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { getMyPetsThunk } from '../../slices/petsSlices'
import MyPet from '../MyPet/MyPet'
import styles from './MyPets.module.css'
import Empty from '../Empty/Empty'
import LoaderMyPet from '../Loaders/LoaderMyPet/LoaderMyPet'

function MyPets() {

  const {myPets,loading} = useAppSelector(state => state.pet)

  const {token} = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()

  useEffect(()=>{

    if(token){
        dispatch(getMyPetsThunk({token}))
    }

  },[])

  return (
    <div className={styles.myPets}>
      {!loading && myPets.length !== 0 && myPets.map((myPet)=> <MyPet key={myPet._id} pet={myPet}/>)}
      {!loading && myPets.length === 0 && <Empty text='Você não possui pets'/>}
      {loading && <LoaderMyPet/>}
    </div>
  )
}

export default MyPets
