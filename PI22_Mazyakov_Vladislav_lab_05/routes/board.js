const Router = require('express')
const router = new Router()
const boardController = require('../controller/board')
const passport = require('passport')

router.post('/board',passport.authenticate('jwt', { session: false }), boardController.createBoard)
router.get('/board', passport.authenticate('jwt', { session: false }), boardController.getBoards)
router.put('/board', passport.authenticate('jwt', { session: false }), boardController.updateBoard)
router.delete('/board', passport.authenticate('jwt', { session: false }), boardController.deleteBoard)

module.exports = router
