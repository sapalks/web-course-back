const express = require('express')
const taskRouter = require('./routes/task.routes')
const stepRouter = require('./routes/step.routes')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use('/api', taskRouter)
app.use('/api', stepRouter)

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toUTCString() });
});

app.listen(PORT, () => console.log(`server started on post ${PORT}`))