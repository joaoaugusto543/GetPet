const bcrypt=require('bcrypt')

async function verifyPassword(user,password){
    return await bcrypt.compare(password,user.password)
}

module.exports=verifyPassword