const Router = require('express')
const router = new Router()
const DesireController = require('../controllers/Desire')

router.post('/Desire', DesireController.createDesire)
router.get('/Desires', DesireController.getAllDesires)
router.get('/Desire/:id', DesireController.getDesire)
router.put('/Desire', DesireController.updateDesire)
router.delete('/Desire/:id', DesireController.deleteDesire)

module.exports = router