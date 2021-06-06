const express = require('express')
const app = express()
const port = 3000

const personRouter = require('./routes/personRTS')
const roomRouter = require('./routes/roomRTS')

app.use(express.json());

app.listen(port, () => {
    console.log(`Working on http://localhost:${port}`)
});

app.use('/api', personRouter);
app.use('/api', roomRouter);