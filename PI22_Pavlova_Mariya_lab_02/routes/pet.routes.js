const Router = require('express')
const router = new Router()
const petController = require('../controllers/pet.controller')

router.post('/pet', petController.createPet)
router.get('/pet/:id', petController.getPet)
router.get('/pet', petController.getPetsByPerson)
router.put('/pet', petController.updatePet)
router.delete('/pet/:id', petController.deletePet)

module.exports = router