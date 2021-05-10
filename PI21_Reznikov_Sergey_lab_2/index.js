const express = require('express')
const app = express()
const port = 3000

const threadRouter = require('./routes/threadRTS')
const messageRouter = require('./routes/messageRTS')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', threadRouter);
app.use('/api', messageRouter);