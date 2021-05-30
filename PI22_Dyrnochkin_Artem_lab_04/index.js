const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')

const bookRouter = require('./routes/bookRTS')
const authorRouter = require('./routes/authorRTS')
const userRouter = require('./routes/userRTS')

app.use(express.json());

app.use(passport.initialize())
require('./config/passport')(passport)

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', bookRouter);
app.use('/api', authorRouter);
app.use('/api', userRouter);