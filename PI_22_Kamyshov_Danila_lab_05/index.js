const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const employeeRouter = require('./routes/employee')
const contractRouter = require('./routes/contract')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.get('/', (req, res) => {
    res.send(`Server is working!`)
});

app.use('/api', employeeRouter);
app.use('/api', contractRouter);