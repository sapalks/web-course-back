const { Router } = require('express')
const router = new Router()
const employerController = require('../controllers/employer.controller')

router.post('/employer', employerController.createEmployer)
router.get('/employer', employerController.getEmployers)
router.get('/employer/:id', employerController.getOneEmployer)
router.put('/employer', employerController.updateEmployer)
router.delete('/employer/:id', employerController.deleteEmployer)
router.get("/usedcache", employerController.isUsedCache)

module.exports = router