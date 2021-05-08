const express = require('express')
const passport = require('passport')
const app = express()
const port = 3000

const CustomerCardRouter = require('./Routes/CustomerCard.routes.js')
const SickListRouter = require('./Routes/SickList.routes.js')
const AuthorizationRouter = require('./Routes/Authorization.routes.js')

app.use(express.json());
app.use(passport.initialize())
require('./Conf/passport')(passport)

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', CustomerCardRouter)
app.use('/api', SickListRouter)
app.use('/api', AuthorizationRouter)