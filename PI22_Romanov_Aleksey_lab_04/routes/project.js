const Router = require('express')
const router = new Router()
const projectController = require('../controller/project')
const passport = require('passport')

router.post('/project', passport.authenticate('jwt', { session: false }), projectController.createProject)
router.get('/project', projectController.getProject)
router.put('/project', passport.authenticate('jwt', { session: false }), projectController.updateProject)
router.delete('/project', passport.authenticate('jwt', { session: false }), projectController.deleteProject)


module.exports = router