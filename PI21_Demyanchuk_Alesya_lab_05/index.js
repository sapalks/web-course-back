const express = require('express')
const port = process.env.PORT || 3000
const clientRouter = require('./routes/clientRTS')
const hotelRoomRouter = require('./routes/hotelRoomRTS')
const app = express()

app.listen(port, () => {
    console.log(`Server working on  http://localhost:${port}`)
});

app.use(express.json())
app.use('/', clientRouter)
app.use('/', hotelRoomRouter)

app.get('/', (req, res) => {
    res.send(`Server is working!`)
});
