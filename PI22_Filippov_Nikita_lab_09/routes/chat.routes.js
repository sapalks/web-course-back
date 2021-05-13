const Router = require('express');
const router = new Router();
const chat = require('../controllers/chat.controller.js');

router.get('/enter', chat.enter)
router.get('/main', chat.main)
router.post('/createRoom', chat.createRoom)

module.exports = router;