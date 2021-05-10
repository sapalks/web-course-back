const Router = require('express')
const router = new Router();
const controller = require('../controllers/employee')
const passport = require('passport')

router.get('/employees', controller.geAllEmployees)
router.get('/employee/:id', controller.getEmployee)
router.post('/employee', passport.authenticate('jwt', { session: false }), controller.createEmployee)
router.put('/employee',  passport.authenticate('jwt', { session: false }), controller.updateEmployee)
router.delete('/employee/:id',  passport.authenticate('jwt', { session: false }), controller.deleteEmployee)

module.exports = router;