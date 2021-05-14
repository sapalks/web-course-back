const Router = require('express')
const router = new Router()
const TimofeyController = require('../controllers/Timofey')

router.post('/Timofey', TimofeyController.createTimofey)
router.get('/Timofeys', TimofeyController.getAllTimofeys)
router.get('/Timofey/:id', TimofeyController.getTimofey)
router.put('/Timofey', TimofeyController.updateTimofey)
router.delete('/Timofey/:id', TimofeyController.deleteTimofey)

module.exports = router