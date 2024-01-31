const bcrypt=require('bcrypt')

async function encryptCode(code){
    
    const salt=await bcrypt.genSalt(12)

    const encryptedCode=await bcrypt.hash(code,salt)

    return encryptedCode
}

module.exports=encryptCode