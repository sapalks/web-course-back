const express = require('express')
const personRouter = require('./routes/person.routes')
const petRouter = require('./routes/pet.routes')
const PORT = process.env.PORT || 5000;

const app = express()

app.use(express.json())
app.use('/', personRouter)
app.use('/', petRouter)

app.listen(PORT, () => console.log('server has been started'))

app.get('/', (req, res) => {
    res.send(`server has been started`)
});

