const Router = require('express')
const router = new Router();
const controller = require('../controllers/rollsController');
const passport = require('passport');

//create
router.post('/rolls', passport.authenticate('jwt', { session: false }), controller.create);
//read
router.get('/rollses', controller.readAll);
router.get('/rolls/:rollsId', controller.readOne);
router.get('/rollses/:sushi_barId', controller.readFiltred);
//update
router.put('/rolls', passport.authenticate('jwt', { session: false }), controller.update);
//delete
router.delete('/rolls/:rollsId', passport.authenticate('jwt', { session: false }), controller.delete);

module.exports = router;