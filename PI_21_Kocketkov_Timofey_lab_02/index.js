const express = require('express')
const app = express()

const TimofeyRouter = require('./routes/Timofey')
const DesireRouter = require('./routes/Desire')
const port = 8000

app.use(express.json())
app.use('/api', TimofeyRouter)
app.use('/api', DesireRouter)
app.listen(port, () => {
    console.log(`Server sterder on port ${port}`)
});
