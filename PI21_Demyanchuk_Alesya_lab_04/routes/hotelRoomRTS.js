const Router = require('express')
const router = new Router()
const hotelRoomController = require('../controller/hotelRoomCTRL')
const passport = require('passport')

router.post('/hotelRoom',passport.authenticate('jwt', { session: false }), hotelRoomController.createhotelRoom)
router.get('/hotelRoom/:id', hotelRoomController.gethotelRoom)
router.get('/hotelRoom', hotelRoomController.geAllhotelRooms)
router.put('/hotelRoomupdate', passport.authenticate('jwt', { session: false }),hotelRoomController.updatehotelRoom)
router.delete('/hotelRoomdel/:id',passport.authenticate('jwt', { session: false }), hotelRoomController.deletehotelRoom)

module.exports = router