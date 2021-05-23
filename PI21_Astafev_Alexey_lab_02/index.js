const express = require('express')
const app = express()
const port = 3000

const bookRouter = require('./routes/bookRTS')
const authorRouter = require('./routes/authorRTS')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', bookRouter);
app.use('/api', authorRouter);
