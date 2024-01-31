const bcrypt=require('bcrypt')

async function verifyCode(user,code){

    return await bcrypt.compare(code,user.code)
}

module.exports=verifyCode