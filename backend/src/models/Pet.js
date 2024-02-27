const mongoose = require('../db/conn')

const {Schema} = mongoose

const Pet= mongoose.model(
    'Pet',
    new Schema(
        {    
            name:{
                type:String,
                require: true
            },
            size:{
                type:String,
                require: true
            },
            images:{
                type:Array,
                require: true
            },
            available:{
                type:Boolean,
                require:true,
                default:false
            },
            species:{
                type:String,
                require:true
            },
            description:{
                type:String,
                require:true
            },
            candidates:{
                type:Array,
                require:true,
                default:[]
            },
            user:Object,
            adopter:Object
        },
        {
            timestamps: true
        }
    )    
)

module.exports=Pet