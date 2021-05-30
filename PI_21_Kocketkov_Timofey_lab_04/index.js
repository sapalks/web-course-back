const express = require('express')
const app = express()

const TimofeyRouter = require('./routes/Timofey')
const DesireRouter = require('./routes/Desire')
const UserRouter = require('./routes/User')
const port = 8000
const passport = require('passport');

app.use(express.json());
app.use(passport.initialize())
require('./passport/passport')(passport)

app.use('/api', TimofeyRouter)
app.use('/api', DesireRouter)
app.use('/api', UserRouter)
app.listen(port, () => {
    console.log(`Server starder on port ${port}`)
});
