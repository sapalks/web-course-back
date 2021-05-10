const Router = require('express')
const router = new Router();
const controller = require('../controller/teamCTRL')
const passport = require('passport')

router.get('/teams', controller.geAllTeams) //список всех команд
router.get('/team/:id', controller.getTeam) //команда по id
router.post('/team', passport.authenticate('jwt', { session: false }), controller.createTeam) //создает запись с новой командой
router.put('/team', passport.authenticate('jwt', { session: false }), controller.updateTeam) //редактирует запись в таблице команд
router.delete('/team/:id', passport.authenticate('jwt', { session: false }), controller.deleteTeam) //помечает запись с командой удаленной

module.exports = router;