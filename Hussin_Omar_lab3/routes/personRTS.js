const Router = require('express')
const router = new Router();
const controller = require('../controller/personCTRL')
const passport = require('passport')

router.get('/persons', controller.geAllpersons) 
router.get('/persons/:roomsID', controller.getpersonInroomes) 
router.get('/person/:id', controller.getperson) 
router.post('/person', passport.authenticate('jwt', { session: false }), controller.createperson) 
router.put('/person', passport.authenticate('jwt', { session: false }), controller.updateperson) 
router.delete('/person/:id', passport.authenticate('jwt', { session: false }), controller.deleteperson) 

module.exports = router;