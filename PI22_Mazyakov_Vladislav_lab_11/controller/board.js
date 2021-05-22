const db = require('../db')
const cache = require('../cache.js')

class BoardController {
    async createBoard(req, res) {
        const { boardname } = req.body
        const newBoard = await db.query(
            'INSERT INTO bulletinboards(boardname) values ($1) Returning *', [boardname]
        )
         res.json(newBoard.rows[0])
         cache.delete('board')
    }

    async getBoards(req, res) {
      const cached = await cache.get('board')
        if (cached) {
            return res.json(cached)
        }
        const id = req.query.id
        if (id) {
            const board = await db.query('SELECT * FROM bulletinboards where id = $1 and isDeleted = false', [id])
            cache.save('board', board.rows[0])
            res.json(board.rows[0])
        } else {
            const boards = await db.query('SELECT * FROM bulletinboards where isDeleted = false')
            cache.save('board', boards.rows)
            res.json(boards.rows)
        }
    }

    async updateBoard(req, res) {
        const { id, name } = req.body
        const board = await db.query('UPDATE bulletinboards set boardname = $2 where id = $1 RETURNING *',
            [id, name])
        cache.delete('board')
        res.json(board.rows[0])
    }

    async deleteBoard(req, res) {
        const id = req.query.id
        await db.query('Update bulletinboards set isDeleted = true where id = $1', [id])
        res.json(`bulletin board with id: ${id} was deleted`)
        cache.delete('board')
    }
    async isCached(req, res) {
      const key = await cache.getLastKey()
      if (key) {
          return res.json(`В кеше сохранён ключ ${key}`)
      }
      res.json("Кеширования не было")
   }
}

module.exports = new BoardController()
