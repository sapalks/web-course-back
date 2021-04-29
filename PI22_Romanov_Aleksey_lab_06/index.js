const express = require('express')
const passport = require('passport')
const port = process.env.port || 8080

const oauthRouter = require('./routes/oauth')

const app = express()

app.get('/', (req, res) => { res.send('Server is working!') })

app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use('/', oauthRouter)

app.listen(port, () => { console.log('server started on http://localhost:' + port) })