const mongoose = require('mongoose')

const uri=process.env.DB_URI

async function main(){
    await mongoose.connect(uri)
    console.log('Connected to the database')
}

main().catch(error => console.log(error))

module.exports=mongoose