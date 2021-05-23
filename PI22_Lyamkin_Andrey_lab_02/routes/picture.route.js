const Router = require('express')
const router = new Router()
const Pictures = require('../controllers/picture.controller.js')

router.post('/pictures', Pictures.create)
router.get('/pictures', Pictures.read)
router.put('/pictures', Pictures.update)
router.delete('/pictures', Pictures.delete)

module.exports = router