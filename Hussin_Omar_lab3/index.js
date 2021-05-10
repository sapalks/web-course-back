const express = require('express')
const app = express()
const port = 9000
const passport = require('passport')

const personRouter = require('./routes/personRTS')
const roomsRouter = require('./routes/roomsRTS')
const userRouter = require('./routes/userRTS')

app.use(express.json());

app.use(passport.initialize())
require('./config/passport')(passport)

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/om', personRouter);
app.use('/om', roomsRouter);
app.use('/om', userRouter);