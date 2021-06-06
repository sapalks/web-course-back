const express = require('express')
const app = express()
const port = 3000

const teacherRouter = require('./routes/teacherRouter')
const subjectRouter = require('./routes/subjectRouter')

app.use(express.json());

app.listen(port, () => {
    console.log(`App runs on http://localhost:${port}`)
});

app.use('', teacherRouter);
app.use('', subjectRouter);