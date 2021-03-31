const Router = require('express')
const router = new Router();
const writerController = require('../controller/writer.controller')

router.post('/writer', writerController.createWriter)
router.get('/writer', writerController.getWriters)
router.get('/writer/:id', writerController.getWriter)
router.put('/writer', writerController.updateWriter)
router.delete('/writer/:id', writerController.deleteWriter)


module.exports = router;