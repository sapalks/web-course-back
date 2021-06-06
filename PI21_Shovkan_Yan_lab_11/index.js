const express = require('express')
const app = express()
const port = 3000

const firmR = require('./routes/firmR')
const vacancyR = require('./routes/vacancyR')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', firmR);
app.use('/api', vacancyR);