import React, { useEffect, useState } from 'react'
import styles from './FormPet.module.css'
import { IoMdAddCircle } from 'react-icons/io'
import ImageCrop from '../ImageCrop/ImageCrop'
import useHandleCrop from '../../hooks/useHandleCrop'
import ImagePet from '../ImagePet/ImagePet'
import { useAppDispatch, useAppSelector } from '../../store'
import { useNavigate } from 'react-router-dom'
import { createPetThunk, resetError, resetPet, resetSuccess, updatePetThunk } from '../../slices/petsSlices'
import useFetchPet from '../../hooks/useFetchPet'
import ImagesPet from '../../interfaces/imagesPet'
import { DataPet } from '../../interfaces/DataPet'
import useVerifyPet from '../../hooks/useVerifyPet'
import LoaderAddImage from '../Loaders/LoaderAddImage/LoaderAddImage'
import Doubt from '../Doubt/Doubt'
import { ErrorsPetInterface } from '../../interfaces/ErrorsPetInterface'
import useFetchErrorsPet from '../../hooks/useFetchErrorsPet'
import Error from '../Error/Error'

type Props={
    id:string | undefined,
    type:string
}

function FormPet({id,type}:Props) {

  const pet = useFetchPet({id})
  
  useVerifyPet({id})

  const [errosPetObject,setErrosPetObject] = useState<ErrorsPetInterface>({})

  const [name,setName]=useState<string>('')
  const [species,setSpecies]=useState<string>('')
  const [size,setSize]=useState<string>('')
  const [description,setDescription]=useState<string>('')
  const [image,setImage]=useState<null | File>(null)
  const [images,setImages]=useState<(any)[]>([])
  const [messageSuccessEdit, setMessageSuccessEdit]= useState('')

  const {error,errorDescription,errorName,errorSize,errorSpecies}=useFetchErrorsPet({errosPetObject,setErrosPetObject})

  useEffect(()=>{
    if(pet && id){

        setName(pet.name)
        setSpecies(pet.species)
        setSize(pet.size)
        setDescription(pet.description)
        setImages(pet.images)

    }else{

        setName('')
        setSpecies('')
        setSize('')
        setDescription('')
        setImages([])

        dispatch(resetPet())

    }
  },[pet,id])

  const [showCrop,setShowCrop]=useState<boolean>(false)

  const {handleOpenCrop,handleCloseCrop}=useHandleCrop({setImage,setShowCrop})

  const {loading,success}=useAppSelector(state => state.pet)
  const {token} = useAppSelector(state => state.auth)

  useVerifyPet({id})

  const dispatch=useAppDispatch()

  const navigate=useNavigate()

  useEffect(()=>{

    if(!success){
        return
    }

    if(type === 'create'){
        navigate('/')
        dispatch(resetSuccess())
    }else{
        setMessageSuccessEdit('Editado com sucesso!')
        setTimeout(()=>{
            setMessageSuccessEdit('')
        },3000)
    }

    dispatch(resetSuccess())

  },[success])
  
  function handleSubmit(e:React.BaseSyntheticEvent){

        e.preventDefault()

        if(!token || loading){
            return
        }

        const pet:DataPet={
            name,
            species,
            size,
            description,
            images
        }

        dispatch(resetError())
        setErrosPetObject({})

        if(type === 'create'){
            dispatch(createPetThunk({token,pet}))
            return
        }

        if(type === 'edit' && id){

            setImages((state:any[]) => state.map((img,index)=>{

                if(img.position === 'none'){
                    img.position = index + 1

                    return img
                }

                return img

            }))

            dispatch(updatePetThunk({token,pet,id}))
        }
        

  }
  
  return (
    <>   
        {messageSuccessEdit && <p className={styles.success}>{messageSuccessEdit}</p>}
        {showCrop && image && <ImageCrop handleClose={handleCloseCrop} image={image} setImages={setImages} type={type}/>}
        <form className={styles.formPet}>
            <label>
                <span>Nome:</span>
                <input type='text' value={name} max={32} onChange={(e)=>setName(e.target.value)} placeholder='Digite o nome do seu pet' />
                <Error error={errorName}/>
            </label>
            <label>
                <span>Espécie:</span>
                <input type='text' value={species} onChange={(e)=>setSpecies(e.target.value)} placeholder='Digite a espécie do seu pet' />
                <Error error={errorSpecies}/>
            </label>
            <label>
                <span>Tamanho:</span>
                <select value={size} onChange={(e)=>setSize(e.target.value)}>
                    <option value=''>Selecione um tamanho</option>
                    <option value='Grande'>Grande</option>
                    <option value='Médio'>Médio</option>
                    <option value='Pequeno'>Pequeno</option>
                </select>
                <Error error={errorSize}/>
            </label>
            <label>
                <span>Descrição:</span>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Digite uma descrição para seu pet'/>
                <Error error={errorDescription}/>
            </label>
            <label className={styles.files} id={styles.file}>
                {!loading ? <span><IoMdAddCircle/>Adicionar imagem</span> : <LoaderAddImage/>} 
                <input type='file' value={image ? image.webkitRelativePath : ''} accept='.png , .jpg , .jpeg' onChange={handleOpenCrop}/>
            </label>
            <div className={styles.containerImages}>
                {images && images.map((image:ImagesPet | File,index:number) => <ImagePet key={index} images={images} position={index} setImages={setImages} image={image}/>)}
                <span>{images.length}/10</span>
            </div>
            {type === 'edit' && <Doubt text='Clique em cima dos números para mudar a ordem'/>}
            <Error error={error}/>
            {!loading ? <input type='submit' onClick={handleSubmit} value={type === 'create' ? 'Criar' : 'Editar'} /> : <input type='submit' disabled value='Aguarde...' />}
        </form>
    </>
  )
}

export default FormPet
