const express = require('express')
const port = process.env.port || 8080

const userRouter = require('./routes/user')
const projectRouter = require('./routes/project')

const app = express()

app.get('/', (req, res) => {
    res.send('Server is working!')
})

app.use(express.json())
app.use('/', userRouter)
app.use('/', projectRouter)

app.listen(port, () => {
    console.log('server started on http://localhost:' + port);
})