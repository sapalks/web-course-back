const express = require('express')
const app = express()

const CookRouter = require('./routes/Cook')
const SushiRouter = require('./routes/Sushi')
const UserRouter = require('./routes/User')
const port = 8000
const passport = require('passport');

app.use(express.json())
app.use(passport.initialize())
require('./passport/passport')(passport)

app.use('/api', CookRouter)
app.use('/api', SushiRouter)
app.use('/api', UserRouter)
app.listen(port, () => {
    console.log(`Server works on port ${port}`)
});
