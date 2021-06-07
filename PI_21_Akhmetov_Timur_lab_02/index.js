const express = require('express')
const app = express()
const port = 3000

const studentRouter = require('./routes/studentRTS')
const specialityRouter = require('./routes/specialityRTS')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', studentRouter);
app.use('/api', specialityRouter);