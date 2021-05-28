const express = require('express')
const app = express()
const port = 4892

const personRouter = require('./routes/personRTS')
const roomsRouter = require('./routes/roomsRTS')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/om', personRouter);
app.use('/om', roomsRouter);