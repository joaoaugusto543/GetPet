const mongoose = require('../db/conn')

const {Schema} = mongoose

const User= mongoose.model(
    'User',
    new Schema(
        {    
            name:{
                type:String,
                require: true
            },
            email:{
                type:String,
                require: true
            },
            password:{
                type:String,
                require: true
            },
            image:{
                type:String,
            },
            phone:{
                type:String,
                require: true
            },
            uf:{
                type:String,
                require:true
            },
            city:{
                type:String,
                require:true
            }
        
        },
        {
            timestamps: true
        }
    )    
)

module.exports=User