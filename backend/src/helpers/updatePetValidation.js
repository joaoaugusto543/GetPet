const {body}= require('express-validator')

function updatePetValidation(){
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
            .withMessage('Specie is required')
            .isLength({min:1, max:12})
            .withMessage('Invalid specie'),
        body('description')
            .isString()
            .withMessage('Invalid description')
            .isLength({min:3})
            .withMessage('Description too small')
        ]
}

module.exports=updatePetValidation