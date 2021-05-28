const express = require('express')
const app = express()
const port = 3000

const passport = require("passport")
const employeeRouter = require('./routes/employee')
const contractRouter = require('./routes/contract')
const authRouter = require('./routes/auth')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use('/api', employeeRouter);
app.use('/api', contractRouter);
app.use('/api', authRouter);