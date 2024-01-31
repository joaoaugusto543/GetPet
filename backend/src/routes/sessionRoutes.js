const {Router} = require('express')
const verifyUser = require('../helpers/verifyUser')
const { createSession } = require('../controllers/SessionControllers')

const routes = new Router()

routes.post('/',verifyUser,createSession)

module.exports=routes