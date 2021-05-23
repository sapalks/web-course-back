const Router = require('express');
const router = new Router();
const chat = require('../controllers/chat.controller.js');

router.get('/enter', chat.enter)
router.post('/createRoom', chat.createRoom)
router.get('/main', chat.main)
router.post('/publish', chat.publish)
router.get('/subscribe', chat.subscribe)

module.exports = router;