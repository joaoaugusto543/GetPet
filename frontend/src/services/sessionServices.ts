import Api from '../api/Api'
import DataCreateSession from '../interfaces/DataCreateSession'

async function createSession(login:DataCreateSession){

    try {

        const response=await Api.post('/session/',login)
    
        const data = response.data
    
        return data
        
    } catch (error:any) {
        console.log(error)
        return error.response.data
    }
}

const sessionServices={
    createSession
}

export default sessionServices