import Api from '../api/Api'
import DataCreateUser from '../interfaces/DataCreateUser'

async function createUser(newUser:DataCreateUser){
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

async function updateCode(email:string){
    try {

        const response=await Api.patch('/user/code',{email})

        const data=response.data

        return data


    } catch (error:any) {
        console.log(error)
        return error.response.data
    }
}

const userServices={
    createUser,
    updateCode
}

export default userServices