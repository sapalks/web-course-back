const express = require('express')
const passport = require('passport')
const port = process.env.port || 8080

const userRouter = require('./routes/user')
const projectRouter = require('./routes/project')
const authRouter = require('./routes/auth')

const app = express()

app.get('/', (req, res) => { res.send('Server is working!') })

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(express.json())
app.use('/', userRouter)
app.use('/', projectRouter)
app.use('/', authRouter)

app.listen(port, () => { console.log('server started on http://localhost:' + port) })