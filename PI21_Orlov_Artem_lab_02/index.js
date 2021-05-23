const express = require('express')
const app = express()
const port = 3000

const brandRouter = require('./Routes/brand.routes.js')
const carRouter = require('./Routes/car.routes')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', brandRouter)
app.use('/api', carRouter)
