const express = require('express')
const taskRouter = require('./routes/task.routes')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use('/api', taskRouter)

app.listen(PORT, () => console.log(`server started on post ${PORT}`))