const Router = require('express');
const router = new Router();
const oauth = require('../controllers/oauth.controller.js');

router.get('/main', oauth.main);
router.get('/enter', oauth.enter);
router.get('/logout', oauth.logout);
router.get('/auth', oauth.auth)
router.get('/token', oauth.token);
router.post('/upload', oauth.upload)
router.get('/getFiles', oauth.getFiles)
router.get('/download', oauth.download)

module.exports = router;