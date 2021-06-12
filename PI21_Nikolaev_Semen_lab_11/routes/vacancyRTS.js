const Router = require('express')
const router = new Router()
const vacancyController = require('../controller/vacancyCTRL')

router.post('/vacancy', vacancyController.createvacancy)
router.get('/vacancy/:id', vacancyController.getvacancy)
router.get('/vacancy', vacancyController.geAllvacancys)
router.get('/vacancyCached', vacancyController.isCached) 
router.put('/vacancyupdate', vacancyController.updatevacancy)
router.delete('/vacancydel/:id', vacancyController.deletevacancy)

module.exports = router