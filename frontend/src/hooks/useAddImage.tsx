import ImagesPet from '../interfaces/imagesPet'
import turnIntoFile from '../scripts/turnIntoFile'
import { addImageThunk } from '../slices/petsSlices'
import { useAppDispatch, useAppSelector } from '../store'

type Props={
    setImages:React.Dispatch<React.SetStateAction<(File | ImagesPet)[]>>,
    handleClose:Function,
    type:string
}

function useAddImage({setImages,handleClose,type}:Props) {

    const {pet} = useAppSelector(state => state.pet)
    const dispatch = useAppDispatch()
    const {token} = useAppSelector(state => state.auth)
 
    function handleAddImage(canvas:HTMLCanvasElement | null){

        if(!canvas){
            return
        }

        canvas.toBlob((blob)=>{

            if(!blob){
                return
            }

            const img= turnIntoFile(blob)

            if(type === 'create'){

                setImages((state:(File | ImagesPet)[]) => {
    
                    if(state.length < 10){
                        return [...state,img]
                    }
    
                    return state
    
                })

            }

            if(type === 'edit'){

                if(!pet || !token){
                    return
                }

                dispatch(addImageThunk({token,id:pet._id,image:img}))

            }

        })

        handleClose()
    }

    return handleAddImage

}

export default useAddImage
