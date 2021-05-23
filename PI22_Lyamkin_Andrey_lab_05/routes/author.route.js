const Router = require('express')
const router = new Router()
const Authors = require('../controllers/author.controller.js')

router.post('/authors', Authors.create)
router.get('/authors', Authors.read)
router.put('/authors', Authors.update)
router.delete('/authors', Authors.delete)

module.exports = router