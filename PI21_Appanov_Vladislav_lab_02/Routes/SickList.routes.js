const Router = require('express')
const router = new Router();
const controller = require('../Controllers/SickListController.js')

router.get('/SickList/:id', controller.getSickList)
router.get('/SickLists/', controller.getSickLists)
router.get('/SickLists/:id', controller.getSickListsByCustomerCard)
router.post('/SickList', controller.createSickList)
router.put('/SickList', controller.updateSickList)
router.delete('/SickList/:id', controller.deleteSickList)

module.exports = router;