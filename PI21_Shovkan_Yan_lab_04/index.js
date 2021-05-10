const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')
app.use(passport.initialize())
require('./passport')(passport)

const firmR = require('./routes/firmR')
const vacancyR = require('./routes/vacancyR')
const clientR = require('./routes/clientR')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', firmR);
app.use('/api', vacancyR);
app.use('/api', clientR);