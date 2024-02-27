const {body}= require('express-validator')

function createPetValidation(){
    return[
        body('name')
            .isString()
            .withMessage('Name is required')
            .isLength({max:15, min:3})
            .withMessage('Very long/small name'),
        body('size')
            .isString()
            .withMessage('Size is required')
            .custom((value,{req})=>{

                if(value !== 'Pequeno' && value !=='Grande' && value !== 'Médio'){
                    throw new Error('Invalid size')
                }

                return true
            }),
        body('species')
            .isString()
            .withMessage('Invalid specie'),
        body('description')
            .isString()
            .withMessage('Invalid description')
            .isLength({min:3})
            .withMessage('Description too small')
        ]
}

module.exports=createPetValidation