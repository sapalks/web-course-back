const express = require('express')
const app = express()
const port = 4040

const employeeRouter = require('./routes/employeeR')
const companyRouter = require('./routes/companyR')

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

app.use('/const', employeeRouter);
app.use('/const', companyRouter);