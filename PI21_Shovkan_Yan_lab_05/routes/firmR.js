const Router = require('express');
const router = new Router();
const controller = require('../controllers/firmC');
const passport = require('passport');

//create
router.post('/firm',  passport.authenticate('jwt', { session: false }),controller.create);
//read
router.get('/firms', controller.readAll);
router.get('/firm/:firmId', controller.readOne);
//update
router.put('/firm',  passport.authenticate('jwt', { session: false }),controller.update);
//delete
router.delete('/firm/:firmId',  passport.authenticate('jwt', { session: false }),controller.delete);

module.exports = router;