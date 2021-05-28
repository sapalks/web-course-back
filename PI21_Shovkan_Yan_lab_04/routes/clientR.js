const Router = require('express');
const router = new Router();
const controller = require('../controllers/clientC');

router.get('/register', controller.register);
router.get('/login', controller.login);

module.exports = router;