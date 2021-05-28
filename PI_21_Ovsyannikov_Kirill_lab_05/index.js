const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const sushi_barRoute = require('./routes/sushi_barRoute')
const rollsRoute = require('./routes/rollsRoute')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.get('/', (req, res) => {
    res.send(`Server is working!`)
});

app.use('/api', sushi_barRoute);
app.use('/api', rollsRoute);