const Router = require('express')
const router = new Router();
const controller = require('../controllers/employee')

router.get('/employees', controller.geAllEmployees)
router.get('/employee/:id', controller.getEmployee)
router.post('/employee', controller.createEmployee)
router.put('/employee', controller.updateEmployee)
router.delete('/employee/:id', controller.deleteEmployee)

module.exports = router;