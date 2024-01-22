const {Router} = require('express')
const { createUser } = require('../controllers/UserControllers')

const routes = new Router()

routes.post('/',createUser)

module.exports=routes