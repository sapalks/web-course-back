const express = require('express')
const app = express()
const port = 3000

const studentRouter = require('./routes/studentRTS')
const educationRouter = require('./routes/educationRTS')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', studentRouter);
app.use('/api', educationRouter);