const express = require('express')
const authorsRoutes = require('./routes/author.route.js')
const picturesRoutes = require('./routes/picture.route.js')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/ping', (req, res) => {
    res.json({
        status: 'ok',
        time: new Date().toUTCString()
    })
})

app.listen(PORT, () => {
    console.log('Сервер доступен по адресу http://localhost:%d', PORT)
})

app.use('/', authorsRoutes)
app.use('/', picturesRoutes)