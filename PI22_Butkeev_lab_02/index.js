const express = require('express')
const app = express()
const port = 3000

const studentRouter = require('./routes/studentRTS')
const classRouter = require('./routes/classRTS')

app.use(express.json());

app.listen(port, () => {
    console.log(`Working on http://localhost:${port}`)
});

app.use('/api', studentRouter);
app.use('/api', classRouter);