const {validationResult} = require('express-validator')

async function handleValidation(req,res,next){

    const errors= validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    const extractErros=[]

    errors.array().map((error)=>extractErros.push(error.msg))

    return res.status(422).json({error:extractErros})
    
}

module.exports=handleValidation