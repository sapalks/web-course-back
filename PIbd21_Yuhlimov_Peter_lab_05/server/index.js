const express = require('express')
const writerRouter = require('./routes/writer.routes')
const bookRouter = require('./routes/book.routes')
const app = express()

const port = process.env.PORT

app.use(express.json())

app.listen(port, () => {
    console.log(`Server is working!`)
});

app.get('/', (req, res) => {
    res.send(`Server is working!`)
});

app.use('/api',writerRouter)
app.use('/api',bookRouter)