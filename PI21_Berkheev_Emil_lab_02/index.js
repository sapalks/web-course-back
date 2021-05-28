const express = require('express')
const app = express()
const port = 3000

const playerRouter = require('./routes/playerRTS')
const teamRouter = require('./routes/teamRTS')

app.use(express.json());

app.listen(port, () => {
    console.log(`Working on http://localhost:${port}`)
});

app.use('/api', playerRouter);
app.use('/api', teamRouter);