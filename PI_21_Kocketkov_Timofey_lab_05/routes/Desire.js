const Router = require('express')
const router = new Router()
const DesireController = require('../controllers/Desire')
const passport = require('passport')

router.post('/Desire', passport.authenticate('jwt', { session: false }), DesireController.createDesire)
router.get('/Desires', DesireController.getAllDesires)
router.get('/Desire/:id', DesireController.getDesire)
router.get('/Desire', DesireController.getTimofeysDesire)
router.put('/Desire',  passport.authenticate('jwt', { session: false }), DesireController.updateDesire)
router.delete('/Desire/:id',  passport.authenticate('jwt', { session: false }), DesireController.deleteDesire)

module.exports = router