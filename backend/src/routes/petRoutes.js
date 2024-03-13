const {Router} = require('express')
const { 
    
    createPet, 
    getPets, 
    getPet, 
    getPetsByUser,
    addImage, 
    updatePet, 
    deletePet, 
    addCandidates, 
    getPetDashboard, 
    acceptAdoption, 
    rejectAdoption, 
    getMyPets 

} = require('../controllers/PetsControllers')

const imageUpload = require('../helpers/imageUpload')
const createPetValidation = require('../helpers/createPetValidation')
const handleValidation = require('../helpers/handleValidation')
const auth = require('../helpers/auth')
const updatePetValidation = require('../helpers/updatePetValidation')

const routes = new Router()

routes.post('/',auth,imageUpload.array('images',10), createPetValidation(), handleValidation ,createPet)
routes.get('/user',auth,getPetsByUser)
routes.get('/',getPets)
routes.get('/myPets',auth,getMyPets)
routes.patch('/edit/:id',auth,updatePetValidation(),handleValidation,updatePet)
routes.patch('/addCandidate/:id',auth,addCandidates)
routes.get('/dashboard/:id',auth,getPetDashboard)
routes.delete('/:id',auth,deletePet)
routes.patch('/:id',auth,imageUpload.single('image'),addImage)
routes.get('/:id',getPet)
routes.patch('/accept/:idPet/:idUser',auth,acceptAdoption)
routes.patch('/reject/:idPet/:idUser',auth,rejectAdoption)

module.exports=routes