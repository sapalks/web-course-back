const express = require('express')
const employerRouter = require('./routes/employer.routes')
const taskRouter = require('./routes/task.routes')
const PORT = process.env.PORT || 8080
const app = express()

//Чтобы express распарсил JSON строку
app.use(express.json())

app.use('/api', employerRouter)
app.use('/api', taskRouter)

app.get('/', (req, res) => {
    res.end('<h1>PI22_Prytkin_Timofey Lab 5 HEROKU</h1>')
})

app.listen(PORT, () => console.log(`Сервер запущен на поррту ${PORT}`))

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toUTCString() });
});