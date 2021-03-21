const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')

const studentRouter = require('./routes/studentRTS')
const educationRouter = require('./routes/educationRTS')
const userRouter = require('./routes/userRTS')

app.use(express.json());

app.use(passport.initialize())
require('./config/passport')(passport)

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', studentRouter);
app.use('/api', educationRouter);
app.use('/api', userRouter);