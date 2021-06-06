const Router = require('express')
const router = new Router();
const controller = require('../controller/subjectController')

router.get('/subjects', controller.getAllsubjects) 
router.get('/subject/:id', controller.getsubject) 
router.post('/subject', controller.createsubject) 
router.put('/subject', controller.updatesubject) 
router.delete('/subject/:id', controller.deletesubject) 

module.exports = router;