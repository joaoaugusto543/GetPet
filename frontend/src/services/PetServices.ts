import Api  from '../api/Api'

export async function showPets(){
    try {

        console.log('lopes')
        
        const response= await Api.get('/pet')

        const data=response.data

        return data
        
    } catch (error:any) {
       console.log(error)
       return error.response.data.error
    }
}