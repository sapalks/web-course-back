const express = require('express')
const app = express()
const port = process.env.PORT || 80;
const passport = require('passport')

const messageRouter = require('./routes/messageRTS')
const threadRouter = require('./routes/threadRTS')
const usersRouter = require('./routes/usersRTS')

app.use(express.json());

app.use(passport.initialize())
require('./config/passport')(passport);

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.get('/', (req, res) => {
    res.send(`Server is working!`)
});

app.use('/api', threadRouter);
app.use('/api', messageRouter);
app.use('/api', usersRouter);