const Router = require('express')
const router = new Router();
const controller = require('../controller/employeeC')

router.get('/employees', controller.geAllemployees)
router.get('/employees/:compID', controller.getemployeeIncompanys) 
router.get('/employee/:id', controller.getemployee) 
router.post('/employee', controller.createemployee)
router.put('/employee', controller.updateemployee) 
router.delete('/employee/:id', controller.deleteemployee) 

module.exports = router;