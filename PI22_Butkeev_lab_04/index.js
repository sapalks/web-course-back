const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')

const studentRouter = require('./routes/studentRTS')
const classRouter = require('./routes/classRTS')
const userRouter = require('./routes/userRTS')

app.use(express.json());

app.use(passport.initialize())
require('./config/passport')(passport)

app.listen(port, () => {
    console.log(`Working on http://localhost:${port}`)
});

app.use('/api', studentRouter);
app.use('/api', classRouter);
app.use('/api', userRouter);