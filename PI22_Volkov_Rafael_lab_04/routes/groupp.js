const Router = require('express')
const router = new Router();
const controller = require('../controllers/grouppcontroller')
const passport = require('passport')

router.get('/groupps', controller.getGroupps)
router.get('/groupp/:id', controller.getGroupp)
router.post('/groupp', passport.authenticate('jwt', { session: false }), controller.createGroupp)
router.put('/groupp', passport.authenticate('jwt', { session: false }), controller.updateGroupp)
router.delete('/groupp/:id', passport.authenticate('jwt', { session: false }), controller.deleteGroupp)

module.exports = router;