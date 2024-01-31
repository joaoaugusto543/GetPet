const {body} = require('express-validator')
const getStates = require('./getStates')
const getCities = require('./getCities')

function createUserValidation(){
    return [
        body('name')
            .isString()
            .withMessage('Name is required')
            .isLength({max:32,min:3})
            .withMessage('Very long/small name'),
        body('email')
            .isString()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email'),
        body('password')
            .isString()
            .withMessage('Password is required')
            .isLength({min:7})
            .withMessage('Password too small'),
        body('confirmPassword')
            .isString()
            .withMessage('Confirm password is required')
            .custom((value,{req})=>{

                if(value !== req.body.password){
                    throw new Error('Passwords must be the same')
                }

                return true

            }),
        body('phone')
            .optional()
            .isString()
            .withMessage('Phone is required')
            .custom((value)=>{
                const regexPhone=/^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/

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

module.exports=createUserValidation
