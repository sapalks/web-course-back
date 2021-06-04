const express = require('express')
const port = 3000   
const resumeRouter = require('./routes/resumeRTS')
const vacancyRoomRouter = require('./routes/vacancyRTS')
const app = express()

app.listen(port, () => {
    console.log(`Server working on  http://localhost:${port}`)
});

app.use(express.json())
app.use('/', resumeRouter)
app.use('/', vacancyRoomRouter)

app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
});
