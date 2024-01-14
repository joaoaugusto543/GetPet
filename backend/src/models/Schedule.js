const mongoose = require('../db/conn')

const {Schema} = mongoose

const Schedule= mongoose.model(
    'Schedule',
    new Schema(
       {
            date:{
                type:String,
                require:true
            },
            city:{
                type:String,
                require:true
            },
            uf:{
                type:String,
                require:true
            },
            local:{
                type:String,
                require:true
            }

            Pet:Object
       }
    )    
)

module.exports=Schedule