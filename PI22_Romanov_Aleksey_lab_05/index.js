const express = require('express')
const passport = require('passport')
const PORT = process.env.PORT || 80

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

app.listen(PORT, () => { console.log('server been started on port: ' + PORT) })