const {body} = require('express-validator')
const getStates = require('./getStates')
const getCities = require('./getCities')

function updateUserValidation(){
    return [
        body('name')
            .isString()
            .withMessage('Name is required')
            .isLength({max:32,min:3})
            .withMessage('Very long/small name'),
        body('phone')
            .optional()
            .isString()
            .withMessage('Phone is required')
            .custom((value)=>{
                const regexPhone=/^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/

                if(!value){
                    return true
                }

                if(!regexPhone.test(value)){
                    throw new Error('Invalid phone')
                }

                return true
            }),
        body('uf')
            .isString()
            .withMessage('Uf is required')
            .custom(async (value)=>{
                
                const ufs= await getStates()

                if(!ufs.includes(value)){
                    throw new Error('Invalid uf')
                }

                return true
            }),
        body('city')
            .isString()
            .withMessage('City is required')
            .custom(async (value,{req})=>{

                const cities=await getCities(req.body.uf)

                if(!cities){
                    throw new Error('Invalid uf') 
                }

                if(!cities.includes(value)){
                    throw new Error('Invalid city')  
                }

                return true

            })          
    ]
}

module.exports=updateUserValidation