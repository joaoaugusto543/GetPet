const {Router} = require('express')
const { createPet, getPets } = require('../controllers/PetsContollers')

const routes = new Router()

routes.post('/',createPet)
routes.get('/',getPets)

module.exports=routes