const Router = require('express')
const router = new Router()
const Pictures = require('../controllers/picture.controller.js')
const auth = require('../middlware/authorisationCheck')

router.post('/pictures', auth, Pictures.create)
router.get('/pictures', auth, Pictures.read)
router.put('/pictures', auth, Pictures.update)
router.delete('/pictures', auth, Pictures.delete)

module.exports = router