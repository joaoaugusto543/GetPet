import {v4 as uuidv4} from 'uuid'

function turnIntoFile(blob:Blob){
    const typeFile=blob.type.split('/')[1]

    const nameFile=`${uuidv4()}.${typeFile}`

    const file= new File([blob],nameFile,{type:blob.type})

    return file
}

export default turnIntoFile