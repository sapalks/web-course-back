const Router = require('express')
const router = new Router();
const controller = require('../controller/companyC')

router.get('/companys', controller.geAllcompanys) 
router.get('/company/:id', controller.getcompanys) 
router.post('/company', controller.createcompanys) 
router.put('/company', controller.updatecompanys) 
router.delete('/company/:id', controller.deletecompanys) 

module.exports = router;