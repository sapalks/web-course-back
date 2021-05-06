const express = require('express')
const app = express()
const port = 3000

const CustomerCardRouter = require('./Routes/CustomerCard.routes.js')
const SickListRouter = require('./Routes/SickList.routes')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use('/api', CustomerCardRouter)
app.use('/api', SickListRouter)