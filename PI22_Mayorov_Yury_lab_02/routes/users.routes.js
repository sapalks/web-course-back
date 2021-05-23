const Router = require('express');
const router = new Router();
const users = require('../controllers/user.controller.js');

router.post('/users', users.create);
router.get('/user', users.readByRole);
router.get('/users', users.read);
router.put('/users', users.update);
router.delete('/users', users.delete);

module.exports = router;