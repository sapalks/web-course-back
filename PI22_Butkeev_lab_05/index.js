const express = require('express')
const app = express()
const port = process.env.PORT
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

app.get('/', (req, res) => {
    res.send(`Server is working!`)
});
app.use('/api', studentRouter);
app.use('/api', classRouter);
app.use('/api', userRouter);
