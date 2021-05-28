const express = require('express')
const writerRouter = require('./routes/writer.routes')
const bookRouter = require('./routes/book.routes')
const userRouter = require('./routes/user.router')
const app = express()
const passport = require('passport')
app.use(passport.initialize())
require('./pasport')(passport)


const port = 3000

app.use(express.json())

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})

app.use('/api',writerRouter)
app.use('/api',bookRouter)
app.use('/api',userRouter)