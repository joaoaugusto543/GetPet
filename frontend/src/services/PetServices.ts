import Api  from '../api/Api'

export async function showPets(){
    try {
        
        const response= await Api.get('/pet')

        const data=response.data

        return data
        
    } catch (error:any) {
       console.log(error)
       return error.response.data.error
    }
}

export async function showPet(id:string){
    try {
        
        const response= await Api.get(`/pet/${id}`)

        const data=response.data

        return data
        
    } catch (error:any) {
       console.log(error)
       return error.response.data.error
    }
}