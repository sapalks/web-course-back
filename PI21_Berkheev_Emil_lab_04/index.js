const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')

const playerRouter = require('./routes/playerRTS')
const teamRouter = require('./routes/teamRTS')
const userRouter = require('./routes/userRTS')

app.use(express.json());

app.use(passport.initialize())
require('./config/passport')(passport)

app.listen(port, () => {
    console.log(`Working on http://localhost:${port}`)
});

app.use('/api', playerRouter);
app.use('/api', teamRouter);
app.use('/api', userRouter);