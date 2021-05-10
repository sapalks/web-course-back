const Router = require('express');
const router = new Router();
const roles = require('../controllers/role.contoller.js');

router.post('/roles', roles.create);
router.put('/roles', roles.update);
router.delete('/roles', roles.delete);
router.get('/roles', roles.read);

module.exports = router;