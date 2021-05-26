const express = require('express')
const passport = require('passport')
const PORT = process.env.PORT || 8080

const UserRoute = require('./Route/Users')
const AdRoute = require('./Route/Ad')
const AuthRoute = require('./Route/Auth')

const app = express()

app.get('/', (req, res) => {
    res.send('Server is working!')
})

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(express.json())
app.use('/', UserRoute)
app.use('/', AdRoute)
app.use('/', AuthRoute)

app.listen(PORT, () => {
    console.log('server started on http://localhost:' + PORT);
})