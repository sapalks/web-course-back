const express = require('express')
const app = express()
const port = 3000

const sushi_barRoute = require('./routes/sushi_barRoute')
const rollsRoute = require('./routes/rollsRoute')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', sushi_barRoute);
app.use('/api', rollsRoute);