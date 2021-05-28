const Router = require('express')
const router = new Router();
const controller = require('../controllers/vacancyC');
const passport = require('passport');

//create
router.post('/vacancy', passport.authenticate('jwt', { session: false }), controller.create);
//read
router.get('/vacancyes', controller.readAll);
router.get('/vacancy/:vacancyId', controller.readOne);
router.get('/vacancyes/:firmId', controller.readFiltred);
//update
router.put('/vacancy', passport.authenticate('jwt', { session: false }), controller.update);
//delete
router.delete('/vacancy/:vacancyId', passport.authenticate('jwt', { session: false }), controller.delete);

module.exports = router;