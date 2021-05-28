const Router = require('express')
const router = new Router();
const controller = require('../controller/schoolboyController')
const passport = require('passport')

router.get('/schoolboys', controller.getSchoolboys) 
router.get('/schoolboys/:directionID', controller.getSchoolboyInDirection) 
router.get('/schoolboy/:id', controller.getSchoolboy) 
router.post('/schoolboy', passport.authenticate('jwt', { session: false }), controller.createSchoolboy) 
router.put('/schoolboy', passport.authenticate('jwt', { session: false }), controller.updateSchoolboy) 
router.delete('/schoolboy/:id', passport.authenticate('jwt', { session: false }), controller.deleteSchoolboy) 

module.exports = router;