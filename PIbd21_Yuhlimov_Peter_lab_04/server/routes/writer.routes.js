const Router = require('express')
const router = new Router();
const writerController = require('../controller/writer.controller')
const passport = require('passport')

router.post('/writer', passport.authenticate('jwt', { session: false }), writerController.createWriter)
router.get('/writer',  writerController.getWriters)
router.get('/writer/:id', writerController.getWriter)
router.put('/writer', passport.authenticate('jwt', { session: false }),  writerController.updateWriter)
router.delete('/writer/:id', passport.authenticate('jwt', { session: false }), writerController.deleteWriter)


module.exports = router;