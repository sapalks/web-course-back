const db = require('../db')
const jwt = require('jsonwebtoken')
const timeExpire = 604800

class UserController {
  async register(req, res) {
      const login = req.body.login
      const password = req.body.password
      if (!login || !password) {
          res.status(400).json({ status: 'error', message: 'Incorrect data' })
          return
      }
      const user = await db.query(`SELECT * FROM users WHERE login = $1`, [login])
      if (user.login === login) {
          res.status(400).json({ status: 'error', message: 'User with same login already exists' })
          return
      }
      await db.query(`INSERT INTO users (login, password) VALUES ($1,$2)`, [login, password])
      res.status(200).json({ status: 'ok', message: 'User created' })
  }

  async login(req, res) {
      const { login, password } = req.body
      if (!login || !password) {
          res.status(400).json({ status: 'error', message: 'Incorrect data' })
          return
      }
      const user = await db.query(`SELECT * FROM users WHERE login = $1 AND password = $2`, [login, password])
      if (user.rows[0]) {
          const token = jwt.sign({
              login: user.rows[0].login,
              userId: user.rows[0].id
          }, 'jwt', { expiresIn: timeExpire })
          res.status(200).json({ token: `Bearer ${token}` })
      } else {
          res.status(401).json({
              status: 'error',
              message: 'Invalid login or password'
          })
      }
  }
}

module.exports = new UserController()
