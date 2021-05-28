const Router = require('express');
const router = new Router();
const controller = require('../controllers/chatCTRL');

router.get('/main', controller.main)
router.get('/join', controller.join)
router.get('/subscribe', controller.subscribe)
router.post('/publish', controller.publish)
router.get('/fillingFieldOnline', controller.fillingFieldOnline)

module.exports = router;