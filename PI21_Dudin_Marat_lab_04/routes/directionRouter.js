const Router = require('express')
const router = new Router();
const controller = require('../controller/directionController')
const passport = require('passport')

router.get('/directions', controller.getDirections)
router.get('/direction/:id', controller.getDirection)
router.post('/direction', passport.authenticate('jwt', { session: false }), controller.createDirection) 
router.put('/direction', passport.authenticate('jwt', { session: false }), controller.updateDirection)
router.delete('/direction/:id', passport.authenticate('jwt', { session: false }), controller.deleteDirection) 

module.exports = router;