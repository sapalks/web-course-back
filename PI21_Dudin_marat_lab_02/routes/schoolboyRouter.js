const Router = require('express')
const router = new Router();
const controller = require('../controller/schoolboyController')

router.get('/schoolboys', controller.getSchoolboys) 
router.get('/schoolboys/:directionID', controller.getSchoolboyInDirection) 
router.get('/schoolboy/:id', controller.getSchoolboy) 
router.post('/schoolboy', controller.createSchoolboy) 
router.put('/schoolboy', controller.updateSchoolboy) 
router.delete('/schoolboy/:id', controller.deleteSchoolboy) 

module.exports = router;