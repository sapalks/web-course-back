const express = require('express')
const app = express()
const port = 5333

const productRouter = require('./routes/product')
const grouppRouter = require('./routes/groupp')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', productRouter);
app.use('/api', grouppRouter);