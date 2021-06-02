const express = require('express')
const passport = require('passport')
const app = express()
const PORT = process.env.PORT || 3000

const brandRouter = require('./Routes/brand.routes.js')
const carRouter = require('./Routes/car.routes.js')
const authRouter = require('./Routes/auth.routes.js')

app.use(express.json());
app.use(passport.initialize())
require('./Middleware/passport')(passport)

app.get('/test', (req, res) => {
    res.end(`
        <div>
            <h1>Test done</h1>
        </div>
   `)
})

app.use('/api', brandRouter)
app.use('/api', carRouter)
app.use('/api', authRouter)

app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`)
});
