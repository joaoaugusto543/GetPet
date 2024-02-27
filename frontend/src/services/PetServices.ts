import Api  from '../api/Api'
import { DataPet } from '../interfaces/DataPet'
import organizeImages from '../scripts/organizeImages'

export async function showPets(){
    try {
        
        const response= await Api.get('/pet')

        const data=organizeImages(response.data)

        return data
        
    } catch (error:any) {
       console.log(error)
       return error.response.data.error
    }
}

export async function showPet(id:string){
    try {
        
        const response= await Api.get(`/pet/${id}`)

        const data=organizeImages(response.data)

        return data
        
    } catch (error:any) {
       console.log(error)
       return error.response.data.error
    }
}

export async function showPetsByUser(token:string){
    try {

        Api.defaults.headers.authorization=`Bearer ${token}`
        
        const response= await Api.get('/pet/user/')

        const data=organizeImages(response.data)

        return data
        
    } catch (error:any) {
       console.log(error)
       return error.response.data.error
    }
}

export async function addImage(token:string,id:string,image:File){
    
    try {

        const formData = new FormData()

        const formImage = formData.append('image',image)

        formData.append('addImage',JSON.stringify(formImage))

        Api.defaults.headers.authorization=`Bearer ${token}`
        
        const response= await Api.patch(`/pet/${id}`,formData)

        const data=response.data

        return data
        
    } catch (error:any) {
       console.log(error)
       return error.response.data.error
    }
}

export async function createPet(pet:DataPet,token:string){
    try {

        Api.defaults.headers.authorization=`Bearer ${token}`

        const formData=new FormData()

        const formPet= Object.keys(pet).forEach((key)=>{

            if(!Array.isArray(pet[key])){
                formData.append(key,pet[key])
                return
            }
            
            pet[key].forEach((item:File) => formData.append(`${key}`,item))
        })

        formData.append('pet',JSON.stringify(formPet))
        
        const response= await Api.post('/pet/',formData)

        const data=organizeImages(response.data)

        return data
        
    } catch (error:any) {
       console.log(error)
       return error.response.data
    }
}

export async function updatePet(pet:DataPet,token:string,id:string){
    
    try {

        Api.defaults.headers.authorization=`Bearer ${token}`
        
        const response= await Api.patch(`/pet/edit/${id}`,pet)
        
        const data=organizeImages(response.data)

        return data
        
    } catch (error:any) {
       console.log(error)
       return error.response.data
    }
}

export async function deletePet(token:string,id:string){
    
    try {

        Api.defaults.headers.authorization=`Bearer ${token}`
        
        const response= await Api.delete(`/pet/${id}`)
        
        const data= response.data

        return data
        
    } catch (error:any) {
       console.log(error)
       return error.response.data
    }
}
