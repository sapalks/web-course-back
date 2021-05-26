const Router = require('express')
const router = new Router();
const controller = require('../controller/teamCTRL')

router.get('/teams', controller.geAllTeams) //список всех команд
router.get('/team/:id', controller.getTeam) //команда по id
router.get('/teamCached', controller.isCached) // проверка кэширования
router.post('/team', controller.createTeam) //создает запись с новой командой
router.put('/team', controller.updateTeam) //редактирует запись в таблице команд
router.delete('/team/:id', controller.deleteTeam) //помечает запись с командой удаленной

module.exports = router;