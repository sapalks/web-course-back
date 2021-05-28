const Router = require('express')
const router = new Router();
const controller = require('../controller/playerCTRL')
const passport = require('passport')

router.get('/players', controller.geAllPlayers) //список всех игроков
router.get('/players/:teamID', controller.getPlayerInTeams) //список игроков по указанной команде
router.get('/player/:id', controller.getPlayer) //игрок по id
router.post('/player', passport.authenticate('jwt', { session: false }), controller.createPlayer) //создает запись с новым игроком
router.put('/player', passport.authenticate('jwt', { session: false }), controller.updatePlayer) //редактирует запись в таблице игроков
router.delete('/player/:id', passport.authenticate('jwt', { session: false }), controller.deletePlayer) //помечает запись с игроком удаленной

module.exports = router;