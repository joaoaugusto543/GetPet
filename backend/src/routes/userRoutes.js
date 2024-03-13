const {Router} = require('express')
const { createUser, updateCode, profile , updateUser, sendMessage } = require('../controllers/UserControllers')
const createUserValidation = require('../helpers/createUserValidation')
const handleValidation = require('../helpers/handleValidation')
const auth = require('../helpers/auth')
const imageUpload = require('../helpers/imageUpload')
const updateUserValidation = require('../helpers/updateUserValidation')

const routes = new Router()

routes.post('/',imageUpload.single('profileImage'),createUserValidation(),handleValidation,createUser)
routes.get('/',auth,profile)
routes.patch('/',auth,imageUpload.single('profileImage'),updateUserValidation(),handleValidation,updateUser)
routes.patch('/code',updateCode)
routes.post('/message',auth,sendMessage)

module.exports=routes