const Router = require('express')
const router = new Router()
const boardController = require('../controller/board')

router.post('/board', boardController.createBoard)
router.get('/board', boardController.getBoards)
router.put('/board', boardController.updateBoard)
router.delete('/board', boardController.deleteBoard)

module.exports = router
