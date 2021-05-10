const express = require('express')
const passport = require('passport')
const app = express()
const port = 3000

const brandRouter = require('./Routes/brand.routes.js')
const carRouter = require('./Routes/car.routes.js')
const authRouter = require('./Routes/auth.routes.js')

app.use(express.json());
app.use(passport.initialize())
require('./Middleware/passport')(passport)

app.use('/api', brandRouter)
app.use('/api', carRouter)
app.use('/api', authRouter)

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});
