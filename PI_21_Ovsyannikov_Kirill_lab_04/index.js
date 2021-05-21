const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')
app.use(passport.initialize())
require('./passport')(passport)

const sushi_barRoute = require('./routes/sushi_barRoute')
const rollsRoute = require('./routes/rollsRoute')
const userRoute = require('./routes/userRoute')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', sushi_barRoute);
app.use('/api', rollsRoute);
app.use('/api', userRoute);