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
            profileImage:{
                type:String,
                require:true,
                default:'https://res.cloudinary.com/dezsbjgjj/image/upload/v1706144110/p6uv3s57jyfatagksntg.png',
            },
            phone:{
                type:String
            },
            uf:{
                type:String,
                require:true
            },
            city:{
                type:String,
                require:true
            },
            checked:{
                type:Boolean,
                require:true,
                default:false
            },
            code:{
                type:String
            }
        
        },
        {
            timestamps: true
        }
    )    
)

module.exports=User