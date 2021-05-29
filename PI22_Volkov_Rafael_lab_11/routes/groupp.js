const Router = require('express')
const router = new Router();
const controller = require('../controllers/grouppcontroller')

router.get('/groupps', controller.getGroupps)
router.get('/groupp/:id', controller.getGroupp)
router.post('/groupp', controller.createGroupp)
router.put('/groupp', controller.updateGroupp)
router.delete('/groupp/:id', controller.deleteGroupp)
router.get("/check", controller.isCached)

module.exports = router;