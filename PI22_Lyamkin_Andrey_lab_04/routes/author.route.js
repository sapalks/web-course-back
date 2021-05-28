const Router = require('express')
const router = new Router()
const Authors = require('../controllers/author.controller.js')
const auth = require('../middlware/authorisationCheck')

router.post('/authors', auth, Authors.create)
router.get('/authors', auth, Authors.read)
router.put('/authors', auth, Authors.update)
router.delete('/authors', auth, Authors.delete)

module.exports = router