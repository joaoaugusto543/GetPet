import Api from '../api/Api'
import DataCreateUser from '../interfaces/DataCreateUser'
import DataUpdateUser from '../interfaces/DataUpdateUser'
import { MessageInterface } from '../interfaces/MessageInterface'

export async function createUser(newUser:DataCreateUser){
    try {

        const formData= new FormData()

        const userFormData= Object.keys(newUser).forEach((key)=>formData.append(key,newUser[key]))

        formData.append('user',JSON.stringify(userFormData))
        
        const response=await Api.post('/user/',formData)

        const data=response.data

        return data


    } catch (error:any) {
        console.log(error)
        return error.response.data
    }
}

export async function updateCode(email:string){
    try {

        const response=await Api.patch('/user/code',{email})

        const data=response.data

        return data


    } catch (error:any) {
        console.log(error)
        return error.response.data
    }
}

export async function profile(token:string){
    try {

        Api.defaults.headers.authorization=`Bearer ${token}`

        const response=await Api.get('/user/')

        const data=response.data

        return data
        
    } catch (error:any) {
        console.log(error)
        return error.response.data
    }
}

export async function updateUser(token:string,userUpdated:DataUpdateUser){
    try {

        Api.defaults.headers.authorization=`Bearer ${token}`

        const formData= new FormData()

        const userFormData= Object.keys(userUpdated).forEach((key)=>formData.append(key,userUpdated[key]))

        formData.append('user',JSON.stringify(userFormData))

        const response=await Api.patch('/user/',formData)

        const data=response.data

        return data
        
    } catch (error:any) {
        console.log(error)
        return error.response.data
    }
}

export async function sendMessage(token:string,message:MessageInterface){
    try {

        Api.defaults.headers.authorization=`Bearer ${token}`

        const response=await Api.post('/user/message',message)

        const data=response.data

        return data
        
    } catch (error:any) {
        console.log(error)
        return error.response.data
    }
}
