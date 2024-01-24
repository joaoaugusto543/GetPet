const {Router} = require('express')
const { createPet, getPets, getPet } = require('../controllers/PetsControllers')

const routes = new Router()

routes.post('/',createPet)
routes.get('/',getPets)
routes.get('/:id',getPet)

module.exports=routes