const express = require('express')
const app = express()
const port = process.env.PORT
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

app.get('/', (req, res) => {
    res.send(`Server is working!`)
});
app.use('/api', playerRouter);
app.use('/api', teamRouter);
app.use('/api', userRouter);
