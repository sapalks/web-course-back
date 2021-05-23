const Router = require('express')
const router = new Router();
const controller = require('../controller/roomsCTRL')
const passport = require('passport')

router.get('/rooms', controller.geAllrooms) /
router.get('/rooms/:id', controller.getrooms) 
router.post('/rooms', passport.authenticate('jwt', { session: false }), controller.createrooms) 
router.put('/rooms', passport.authenticate('jwt', { session: false }), controller.updaterooms)
router.delete('/rooms/:id', passport.authenticate('jwt', { session: false }), controller.deleterooms) 

module.exports = router;