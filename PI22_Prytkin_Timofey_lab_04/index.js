const express = require('express')
const employerRouter = require('./routes/employer.routes')
const taskRouter = require('./routes/task.routes')
const authorizationRouter = require('./routes/authorization.routes.js')
const PORT = process.env.PORT || 8080
const app = express()

//Чтобы express распарсил JSON строку
app.use(express.json())

app.use('/api', employerRouter)
app.use('/api', taskRouter)
app.use('/api', authorizationRouter) 

app.listen(PORT, () => console.log(`Сервер запущен на поррту ${PORT}`))