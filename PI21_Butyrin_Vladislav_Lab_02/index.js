const express = require('express')
const app = express()

const CookRouter = require('./routes/Cook')
const SushiRouter = require('./routes/Sushi')
const port = 8000

app.use(express.json())
app.use('/api', CookRouter)
app.use('/api', SushiRouter)
app.listen(port, () => {
    console.log(`Server works on port ${port}`)
});
