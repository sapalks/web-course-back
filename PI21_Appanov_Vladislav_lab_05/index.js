const express = require('express')
const passport = require('passport')
const app = express()
const port = process.env.PORT

const CustomerCardRouter = require('./Routes/CustomerCard.routes.js')
const SickListRouter = require('./Routes/SickList.routes.js')
const AuthorizationRouter = require('./Routes/Authorization.routes.js')

app.use(express.json());
app.use(passport.initialize());
require('./Conf/passport')(passport)

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.get('/', (req, res) => {
    res.send(`Server is working`)
});

app.use('/api', CustomerCardRouter)
app.use('/api', SickListRouter)
app.use('/api', AuthorizationRouter)