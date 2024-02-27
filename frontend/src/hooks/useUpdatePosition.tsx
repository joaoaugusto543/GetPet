import React from 'react'

type Props = {
    image:any,
    images:any[],
    setImages:React.Dispatch<React.SetStateAction<any[]>>
}

function useUpdatePosition({image,setImages,images}: Props) {

    function updatePosition(e:React.BaseSyntheticEvent){

        e.preventDefault()

        //Check if there is a position, as the variable can also be a file

        if(!image?.position){
            return
        }

        //Filtering images with position
        
        const imagesWithPosition = images.filter((image) => image.position !== 'none')

        //If the image does not have a position, it is designated as none
        
        if(image.position === 'none'){

                //adding position to image if there is none
                   
                const petWithHighestRank = imagesWithPosition.reduce((current,later)=>current.position > later.position ? current : later)
    
                const newPosition = petWithHighestRank.position + 1
    
                setImages((state:any[]) => state.map((imageItem)=> {
    
                    if(imageItem.url === image.url){
    
                        const newItem ={
                            url:imageItem.url,
                            position:newPosition
                        }

                        return newItem
    
                    }
    
                    return imageItem
    
                }))
    
        }else{

            if(imagesWithPosition.length === 1){
                return
            }

            const oldPosition= (images.find((imageItem) => imageItem.url === image.url)).position

            setImages((state:any[]) => state.map((imageItem)=> {

                //removing position

                if(imageItem.url === image.url){
                    
                    const newItem={
                        ...imageItem,
                        position:'none'
                    }

                    return newItem
    
                }

                // Reduce positions larger than the image with position removed

                if(oldPosition < imageItem.position){

                    const newItem={
                        ...imageItem,
                        position:imageItem.position - 1
                    }

                    return newItem
                }
    
                return imageItem
    
            }))
        }

        //organization in ascending order by position

        setImages((state) => state.sort((current,previous)=>{

            if(previous.position === 'none'){
                return -1
            }

            if(current.position < previous.position){

                return -1

            }else{

                return 1

            }

        }))
    }


    return updatePosition
  
    

}

export default useUpdatePosition
