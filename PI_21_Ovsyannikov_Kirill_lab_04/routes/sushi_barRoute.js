const Router = require('express');
const router = new Router();
const controller = require('../controllers/sushi_barController');
const passport = require('passport');

//create
router.post('/sushi_bar',  passport.authenticate('jwt', { session: false }),controller.create);
//read
router.get('/sushi_bars', controller.readAll);
router.get('/sushi_bar/:sushi_barId', controller.readOne);
//update
router.put('/sushi_bar',  passport.authenticate('jwt', { session: false }),controller.update);
//delete
router.delete('/sushi_bar/:sushi_barId',  passport.authenticate('jwt', { session: false }),controller.delete);

module.exports = router;