const Router = require('express')
const router = new Router()
const projectController = require('../controller/project')

router.post('/project', projectController.createProject)
router.get('/project', projectController.getProject)
router.put('/project', projectController.updateProject)
router.delete('/project', projectController.deleteProject)


module.exports = router