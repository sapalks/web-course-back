const express = require('express')
const port = process.env.port || 8080

const UserRoute = require('./Route/Users')
const AdRoute = require('./Route/Ad')

const app = express()

app.get('/', (req, res) => {
    res.send('Server is working!')
})

app.use(express.json())
app.use('/', UserRoute)
app.use('/', AdRoute)

app.listen(port, () => {
    console.log('server started on http://localhost:' + port);
})