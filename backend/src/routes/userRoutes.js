const {Router} = require('express')
const { createUser, updateCode } = require('../controllers/UserControllers')
const createUserValidation = require('../helpers/createUserValidation')
const handleValidation = require('../helpers/handleValidation')
const imageUpload = require('../helpers/imageUpload')

const routes = new Router()

routes.post('/',imageUpload.single('profileImage'),createUserValidation(),handleValidation,createUser)
routes.patch('/code',updateCode)

module.exports=routes