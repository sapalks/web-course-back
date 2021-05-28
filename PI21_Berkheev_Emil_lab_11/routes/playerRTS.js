const Router = require('express')
const router = new Router();
const controller = require('../controller/playerCTRL')

router.get('/players', controller.getAllPlayers) //список всех игроков
router.get('/players/:teamID', controller.getPlayerInTeams) //список игроков по указанной команде
router.get('/player/:id', controller.getPlayer) //игрок по id
router.get('/playerCached', controller.isCached) // проверка кэширования
router.post('/player', controller.createPlayer) //создает запись с новым игроком
router.put('/player', controller.updatePlayer) //редактирует запись в таблице игроков
router.delete('/player/:id', controller.deletePlayer) //помечает запись с игроком удаленной

module.exports = router;